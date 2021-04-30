import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';
import Select, {
  components,
  createFilter,
  ActionMeta,
  OptionTypeBase
} from 'react-select';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../../providers/translations';

import SC from './styled';

import { RegistrationStatus } from '../../../types/enums';

interface ExternalProps extends WrappedFieldProps {
  items?: any[];
  valueKey?: string;
  labelKey?: string;
  onInputChange?: (arg: string) => void;
}

interface Props extends ExternalProps, TranslationsProps {}

const SelectField: FC<Props> = ({
  input: { value, onChange },
  meta: { touched, error, warning },
  items = [],
  labelKey = 'prefLabel',
  valueKey = 'uri',
  onInputChange,
  translationsService
}) => {
  const defaultFilter = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFromStart: false,
    stringify: (option: any) =>
      translationsService.translate(option.data[labelKey])
  };

  const getLabel = (option: any) =>
    translationsService.translate(
      option[labelKey] ?? option.title ?? option.prefLabel
    );

  const getValue = () => {
    if (typeof value === 'string' && items) {
      return items.find(item => item[valueKey] === value) ?? {};
    }
    return getLabel(value) ? value : null;
  };

  const saveOption = (option: any, change: ActionMeta<OptionTypeBase>) => {
    switch (change.action) {
      case 'select-option':
        onChange({ prefLabel: option[labelKey], ...option });
        break;
      case 'clear':
        onChange({
          uri: null,
          prefLabel: {
            no: null
          }
        });
        break;
      default:
        break;
    }
  };

  const Option = (props: any) => {
    const { data } = props;
    const label = getLabel(data);
    const publishingStatus = data.registrationStatus;
    const { internal } = data;
    return label ? (
      <components.Option {...props}>
        {label}
        {publishingStatus ? (
          <SC.DatasetOption>
            {`(${
              internal
                ? translationsService.translate(
                    'schema.reference.helptext.internal'
                  )
                : translationsService.translate(
                    'schema.reference.helptext.external'
                  )
            }/ ${
              publishingStatus === RegistrationStatus.PUBLISH
                ? translationsService.translate(
                    'schema.reference.helptext.publish'
                  )
                : translationsService.translate(
                    'schema.reference.helptext.approve'
                  )
            })`}
          </SC.DatasetOption>
        ) : null}
      </components.Option>
    ) : null;
  };

  return (
    <div className='pl-2 mt-3'>
      <Select
        id='frequency-select'
        options={items}
        isClearable
        name='selected-state'
        isDisabled={false}
        components={{
          Option,
          SingleValue: props => getLabel(props.data) as any
        }}
        placeholder='Velg'
        filterOption={onInputChange ? null : createFilter(defaultFilter)}
        onInputChange={onInputChange}
        onChange={saveOption}
        value={getValue()}
        isOptionSelected={(option: any) => option === getValue()}
      />
      {touched &&
        ((error && <div className='alert alert-danger mt-3'>{error}</div>) ||
          (warning && (
            <div className='alert alert-warning mt-3'>{warning}</div>
          )))}
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo, withTranslations)(SelectField);
