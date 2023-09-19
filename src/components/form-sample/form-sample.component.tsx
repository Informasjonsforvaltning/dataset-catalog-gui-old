import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import { Field, FieldArray } from 'redux-form';
import cx from 'classnames';

import Autocomplete from 'react-autocomplete';
import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Translation from '../translation';
import Helptext from '../helptext/helptext.component';
import InputField from '../fields/field-input/field-input.component';
import MultilingualField from '../multilingual-field/multilingual-field.component';
import TextAreaField from '../fields/field-textarea/field-textarea.component';
import { licenseType, textType } from '../../schemaTypes';
import { datasetFormPatchThunk } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';
import LinkReadonlyField from '../fields/field-link-readonly/field-link-readonly.component';
import InputFieldReadonly from '../fields/field-input-readonly/field-input-readonly.component';

import {
  CircleMinusInlineIcon,
  CirclePlusInlineIcon,
  CrossIcon
} from '../../fdk-icons/icons';
import { FileType, MediaType } from '../../types';
import {
  FormatsRenderProps,
  MediaTypesRenderProps
} from '../form-distribution/form-distribution-pure';

interface ExternalProps {
  dispatch: (arg: any) => void;
  catalogId: string;
  datasetId: string;
  datasetItem: any;
  languages: any[];
  fileTypes: FileType[];
  mediaTypes: MediaType[];
  isReadOnly: boolean;
}

interface Props extends ExternalProps, TranslationsProps {}

const Formats = ({
  input: { value: inputValue, onChange },
  fileTypes,
  translationsService
}: FormatsRenderProps) => {
  const [filterText, setFilterText] = useState('');
  return (
    <>
      <Autocomplete
        wrapperProps={{ style: { width: '100%' } }}
        getItemValue={({ uri }) => uri}
        items={
          fileTypes.filter(({ uri, code }) => {
            const match = inputValue?.find((fileType: any) => uri === fileType);
            return !match && code.toLowerCase().includes(filterText);
          }) || []
        }
        renderInput={props => (
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              {...props}
              placeholder={translationsService.translate(
                'schema.distribution.formatPlaceholder'
              )}
            />
            <span className='input-group-btn input-group-append'>
              <button
                type='button'
                className='btn btn-default input-group-text'
                onClick={() => setFilterText('')}
              >
                <CrossIcon />
              </button>
            </span>
          </div>
        )}
        renderItem={({ uri, code }, isHighlighted) => {
          const itemClass = cx('px-2', {
            'fdk-bg-color-neutral-lightest': isHighlighted
          });
          return (
            <div key={uri} className={itemClass}>
              {code}
            </div>
          );
        }}
        renderMenu={(items, value, style) => (
          <div
            key={value}
            className='fdk-autocomplete-menu'
            style={{ ...style }}
          >
            {items.slice(0, 50)}
          </div>
        )}
        value={filterText}
        onChange={e => {
          e.preventDefault();
          setFilterText(e.target.value);
        }}
        onSelect={val => {
          setFilterText('');
          onChange([
            ...inputValue
              .filter((value: any) =>
                fileTypes?.find(({ uri }) => uri === value)
              )
              .filter(Boolean),
            val,
            ...inputValue
              .filter(
                (value: any) => !fileTypes?.find(({ uri }) => uri === value)
              )
              .filter(Boolean)
          ]);
        }}
        menuStyle={{ zIndex: 1000 }}
      />
      <div className='d-flex flex-wrap my-2'>
        {inputValue.filter(Boolean).map((value: any, index: number) => (
          <div key={`filter-${index}-${value}`}>
            <div
              role='button'
              tabIndex={0}
              className='mr-2 mb-1 fdk-badge badge badge-secondary fdk-text-size-15'
              onClick={e => {
                e.preventDefault();
                delete inputValue[index];
                onChange(inputValue.filter(Boolean));
              }}
              onKeyPress={e => {
                e.preventDefault();
                delete inputValue[index];
                onChange(inputValue.filter(Boolean));
              }}
            >
              <span className='fdk-filter-pill'>
                {fileTypes?.find(({ uri }) => uri === value)?.code ?? value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const renderFormat = ({
  input,
  fileTypes,
  translationsService
}: FormatsRenderProps) => (
  <FieldArray
    name={input.name}
    component={Formats}
    input={input}
    fileTypes={fileTypes}
    translationsService={translationsService}
  />
);

const renderFomatsReadOnly = ({
  input: { value },
  fileTypes = []
}: FormatsRenderProps) => (
  <div className='pl-3'>
    {value
      .map(
        (item: any) => fileTypes?.find(({ uri }) => uri === item)?.code ?? item
      )
      .join(', ')}
  </div>
);

const MediaTypes = ({
  input: { value: inputValue, onChange },
  mediaTypes = [],
  translationsService
}: {
  input: any;
  mediaTypes: MediaType[];
  translationsService: any;
}) => {
  const [filterText, setFilterText] = useState('');

  return (
    <>
      <Autocomplete
        wrapperProps={{ style: { width: '100%' } }}
        getItemValue={({ uri }) => uri}
        items={
          mediaTypes.filter(({ uri, name }) => {
            const match =
              Array.isArray(inputValue) &&
              inputValue.find((mediaType: any) => uri === mediaType);
            return !match && name.toLowerCase().includes(filterText);
          }) || []
        }
        renderInput={props => (
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              {...props}
              placeholder={translationsService.translate(
                'schema.distribution.formatPlaceholder'
              )}
            />
            <span className='input-group-btn input-group-append'>
              <button
                type='button'
                className='btn btn-default input-group-text'
                onClick={() => setFilterText('')}
              >
                <CrossIcon />
              </button>
            </span>
          </div>
        )}
        renderItem={({ uri, name }, isHighlighted) => {
          const itemClass = cx('px-2', {
            'fdk-bg-color-neutral-lightest': isHighlighted
          });
          return (
            <div key={uri} className={itemClass}>
              {name}
            </div>
          );
        }}
        renderMenu={(items, value, style) => (
          <div
            key={value}
            className='fdk-autocomplete-menu'
            style={{ ...style }}
          >
            {items.slice(0, 50)}
          </div>
        )}
        value={filterText}
        onChange={e => {
          e.preventDefault();
          setFilterText(e.target.value);
        }}
        onSelect={val => {
          setFilterText('');
          onChange([
            ...inputValue
              .filter((value: any) =>
                mediaTypes?.find(({ uri }) => uri === value)
              )
              .filter(Boolean),
            val,
            ...inputValue
              .filter(
                (value: any) => !mediaTypes?.find(({ uri }) => uri === value)
              )
              .filter(Boolean)
          ]);
        }}
        menuStyle={{ zIndex: 1000 }}
      />
      <div className='d-flex flex-wrap my-2'>
        {inputValue.filter(Boolean).map((value: any, index: number) => (
          <div key={`filter-${index}-${value}`}>
            <div
              role='button'
              tabIndex={0}
              className='mr-2 mb-1 fdk-badge badge badge-secondary fdk-text-size-15'
              onClick={e => {
                e.preventDefault();
                delete inputValue[index];
                onChange(inputValue.filter(Boolean));
              }}
              onKeyPress={e => {
                e.preventDefault();
                delete inputValue[index];
                onChange(inputValue.filter(Boolean));
              }}
            >
              <span className='fdk-filter-pill'>
                {mediaTypes?.find(({ uri }) => uri === value)?.name ?? value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const renderMediaType = ({
  input,
  mediaTypes,
  translationsService
}: MediaTypesRenderProps) => (
  <FieldArray
    name={input.name}
    component={MediaTypes}
    input={input}
    mediaTypes={mediaTypes}
    translationsService={translationsService}
  />
);

const renderMediaTypesReadOnly = ({
  input: { value },
  mediaTypes = []
}: MediaTypesRenderProps) => (
  <div className='pl-3'>
    {value
      .map(
        (item: any) => mediaTypes?.find(({ uri }) => uri === item)?.name ?? item
      )
      .join(', ')}
  </div>
);

const renderSamples = ({
  fields,
  onDeleteFieldAtIndex,
  languages,
  isReadOnly,
  fileTypes,
  mediaTypes,
  translationsService
}: any) => (
  <div>
    {fields?.map((sample: any, index: number) => (
      <div key={index}>
        {!isReadOnly && (
          <div className='d-flex'>
            <button
              className='fdk-btn-no-border'
              type='button'
              title={translationsService.translate(
                'schema.sample.removeSample'
              )}
              onClick={() => onDeleteFieldAtIndex(fields, index)}
            >
              <CircleMinusInlineIcon />
              <Translation id='schema.sample.deleteSampleLabel' />
            </button>
          </div>
        )}
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.sample.helptext.downloadURL'
            )}
          />
          <Field
            name={`${sample}.downloadURL.0`}
            type='text'
            component={isReadOnly ? LinkReadonlyField : InputField}
            label={translationsService.translate(
              'schema.sample.downloadURLLabel'
            )}
          />
        </div>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.sample.helptext.accessURL'
            )}
          />
          <Field
            name={`${sample}.accessURL.0`}
            type='text'
            component={isReadOnly ? LinkReadonlyField : InputField}
            label={translationsService.translate(
              'schema.sample.accessURLLabel'
            )}
          />
        </div>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.sample.helptext.format'
            )}
            term='Distribution_format'
          />
          <Field
            name={`${sample}.format`}
            component={isReadOnly ? renderFomatsReadOnly : renderFormat}
            label={translationsService.translate('schema.sample.formatLabel')}
            fileTypes={fileTypes}
            translationsService={translationsService}
          />
        </div>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.sample.helptext.mediaType'
            )}
            term='Distribution_mediaType'
          />
          <Field
            name={`${sample}.mediaType`}
            type='text'
            component={isReadOnly ? renderMediaTypesReadOnly : renderMediaType}
            label={translationsService.translate(
              'schema.sample.mediaTypeLabel'
            )}
            mediaTypes={mediaTypes}
            translationsService={translationsService}
          />
        </div>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.sample.helptext.description'
            )}
          />
          <MultilingualField
            name={`${sample}.description`}
            component={isReadOnly ? InputFieldReadonly : TextAreaField}
            label={translationsService.translate(
              'schema.sample.descriptionLabel'
            )}
            languages={languages}
          />
        </div>
      </div>
    ))}
    {fields && fields.length === 0 && (
      <button
        className='fdk-btn-no-border'
        type='button'
        onClick={() =>
          fields.push({
            id: '',
            description: textType,
            accessURL: [],
            license: licenseType,
            conformsTo: [],
            page: [licenseType],
            format: [],
            mediaType: [],
            type: ''
          })
        }
      >
        <CirclePlusInlineIcon />
        <Translation id='schema.sample.addSampleLabel' />
      </button>
    )}
  </div>
);

const FormSample: FC<Props> = ({
  dispatch,
  catalogId,
  datasetId,
  datasetItem,
  languages,
  isReadOnly,
  fileTypes,
  mediaTypes,
  translationsService
}) => {
  const deleteFieldAtIndex = (fields: any, index: number) => {
    const values = fields.getAll();
    // use splice instead of skip, for changing the bound value
    values.splice(index, 1);
    const patch = { [fields.name]: values };
    const thunk = datasetFormPatchThunk({
      catalogId,
      datasetId,
      datasetItem,
      patch
    });
    dispatch(thunk);
  };

  return (
    <form>
      <FieldArray
        name='sample'
        component={renderSamples}
        onDeleteFieldAtIndex={deleteFieldAtIndex}
        languages={languages}
        isReadOnly={isReadOnly}
        fileTypes={fileTypes}
        mediaTypes={mediaTypes}
        translationsService={translationsService}
      />
    </form>
  );
};

export default compose<FC<ExternalProps>>(memo, withTranslations)(FormSample);
