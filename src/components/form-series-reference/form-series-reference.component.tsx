import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import Select, { components, createFilter } from 'react-select';
import SC from './styled';

import {
  withTranslations,
  Props as TranslationsProps,
  Language
} from '../../providers/translations';

import Translation from '../translation';
import Helptext from '../helptext/helptext.component';
import { datasetFormPatchThunk } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';

import {
  CircleMinusInlineIcon,
  CirclePlusInlineIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '../../fdk-icons/icons';

interface ExternalProps {
  dispatch: (arg: any) => void;
  catalogId: string;
  datasetId: string;
  datasetItem: any;
  isReadOnly: boolean;
  referenceDatasetsItems: any[];
}

interface Props extends ExternalProps, TranslationsProps {}

const keysSortedByValue = (datasetItem: any) =>
  Object.entries(datasetItem.seriesDatasetOrder)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .map(item => item[0]);

const getCombinedLabel = (item: string | any) =>
  typeof item.title === 'object'
    ? [
        item.title[Language.NB],
        item.title[Language.NN],
        item.title[Language.EN]
      ]
        .filter(Boolean)
        .join(', ')
    : item.title;

const FormSeriesReference: FC<Props> = ({
  dispatch,
  catalogId,
  datasetId,
  datasetItem,
  referenceDatasetsItems,
  translationsService,
  isReadOnly
}) => {
  const [relatedDatasetsMap, setMapState] = useState(
    datasetItem.seriesDatasetOrder || {}
  );
  const [showDropdown, setDropDownState] = useState(false);

  const updateIndexes = () => {
    let counter = 0;
    const keys = Object.keys(relatedDatasetsMap);
    keys.forEach(key => {
      relatedDatasetsMap[key] = counter;
      counter += 1;
    });
  };

  const deleteReferenceById = (id: string) => {
    delete relatedDatasetsMap[id];
    updateIndexes();
    setMapState(relatedDatasetsMap);
    const patch = { seriesDatasetOrder: relatedDatasetsMap };
    const thunk = datasetFormPatchThunk({
      catalogId,
      datasetId,
      datasetItem,
      patch
    });
    dispatch(thunk);
  };

  const addReference = (id: string) => {
    if (id) {
      updateIndexes();
      relatedDatasetsMap[id] = Object.keys(relatedDatasetsMap).length;
      setMapState(relatedDatasetsMap);
      setDropDownState(false);
      const patch = { seriesDatasetOrder: relatedDatasetsMap };
      const thunk = datasetFormPatchThunk({
        catalogId,
        datasetId,
        datasetItem,
        patch
      });
      dispatch(thunk);
    }
  };

  const getItem = (key: string) =>
    referenceDatasetsItems?.find(item => item.id === key) || undefined;

  const getKeyByValue = (value: number) =>
    Object.keys(relatedDatasetsMap).find(
      key => relatedDatasetsMap[key] === value
    );

  const moveUpButton = (id: string, index: number) => {
    const moveUp = () => {
      const previousElement: string | undefined = getKeyByValue(index + 1);
      relatedDatasetsMap[id] = index + 1;
      previousElement && (relatedDatasetsMap[previousElement] = index);

      setMapState(relatedDatasetsMap);
      const patch = { seriesDatasetOrder: relatedDatasetsMap };
      const thunk = datasetFormPatchThunk({
        catalogId,
        datasetId,
        datasetItem,
        patch
      });
      dispatch(thunk);
    };
    return (
      <SC.Border>
        <button
          className='fdk-btn-no-border'
          type='button'
          title={translationsService.translate(
            'schema.reference.helptext.moveReferenceUp'
          )}
          onClick={() => moveUp()}
        >
          <ChevronUpIcon />
        </button>
      </SC.Border>
    );
  };

  const moveDownButton = (id: string, index: number) => {
    const moveDown = () => {
      const nextElement: string | undefined = getKeyByValue(index - 1);
      relatedDatasetsMap[id] = index - 1;
      nextElement && (relatedDatasetsMap[nextElement] = index);

      setMapState(relatedDatasetsMap);
      const patch = { seriesDatasetOrder: relatedDatasetsMap };
      const thunk = datasetFormPatchThunk({
        catalogId,
        datasetId,
        datasetItem,
        patch
      });
      dispatch(thunk);
    };
    return (
      <SC.Border>
        <button
          className='fdk-btn-no-border'
          type='button'
          title={translationsService.translate(
            'schema.reference.helptext.moveReferenceDown'
          )}
          onClick={() => moveDown()}
        >
          <ChevronDownIcon />
        </button>
      </SC.Border>
    );
  };
  const getField = (id: string) => {
    const item = getItem(id);
    const { length } = Object.keys(relatedDatasetsMap);
    const index = relatedDatasetsMap[id];
    return (
      <SC.FieldBox>
        {!isReadOnly && (
          <SC.MoveButtons>
            {index > 0 && moveDownButton(id, index)}
            {index < length - 1 && moveUpButton(id, index)}
          </SC.MoveButtons>
        )}

        <SC.Border>
          <SC.FieldText>
            {item?.title
              ? translationsService.translate(getItem(id).title)
              : id}
          </SC.FieldText>
        </SC.Border>

        {!isReadOnly && (
          <button
            className='fdk-btn-no-border'
            type='button'
            title={translationsService.translate(
              'schema.reference.helptext.removeReference'
            )}
            onClick={() => deleteReferenceById(id)}
          >
            <SC.DeleteButtonText>
              <CircleMinusInlineIcon />
              {translationsService.translate('formStatus.delete')}
            </SC.DeleteButtonText>
          </button>
        )}
      </SC.FieldBox>
    );
  };

  const [selectedValue, setSelectedValueState] = useState(null);

  const Option = (props: any) => {
    const { data } = props;
    const label = getCombinedLabel(data);
    return label ? (
      <components.Option {...props}>{label}</components.Option>
    ) : null;
  };

  const Placeholder = (props: any) => (
    <components.Placeholder {...props}>
      {translationsService.translate(
        'schema.reference.helptext.datasetSearchPlaceholder'
      )}
    </components.Placeholder>
  );

  const SingleValue = ({ data, hasValue, ...props }: any) => (
    <components.SingleValue {...props}>
      {getCombinedLabel(data)}
    </components.SingleValue>
  );

  const defaultFilter = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFromStart: false,
    stringify: (option: any) => option.data.title
  };

  return referenceDatasetsItems && datasetItem ? (
    <form>
      <div className='form-group'>
        <>
          <Helptext
            title={translationsService.translate(
              'schema.reference.helptext.reference'
            )}
            term='Dataset_relation'
            recommended
          />
          <div>
            {datasetItem.seriesDatasetOrder &&
              keysSortedByValue(datasetItem).map(id => getField(id))}
          </div>

          {!isReadOnly && (
            <>
              <button
                className='fdk-btn-no-border'
                type='button'
                onClick={() => setDropDownState(true)}
              >
                <CirclePlusInlineIcon />
                <Translation id='schema.reference.addReferenceLabel' />
              </button>
              {showDropdown && (
                <Select
                  id='frequency-select'
                  options={referenceDatasetsItems.map(item => ({
                    value: item.id,
                    title: getCombinedLabel(item)
                  }))}
                  isClearable
                  name='selected-state'
                  isDisabled={false}
                  filterOption={createFilter(defaultFilter)}
                  components={{ Placeholder, Option, SingleValue }}
                  value={referenceDatasetsItems.filter(
                    obj => obj.value === selectedValue
                  )}
                  onChange={value => {
                    setSelectedValueState(value);
                    addReference(value.value);
                  }}
                />
              )}
            </>
          )}
        </>
      </div>
    </form>
  ) : null;
};

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations
)(FormSeriesReference);
