import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../../providers/translations';
import { DatasetType } from '../../../types';

interface ExternalProps {
  types?: DatasetType[];
}

interface ExternalProps {}

interface Props extends ExternalProps, TranslationsProps, WrappedFieldProps {}

const CheckboxFieldType: FC<Props> = ({
  input,
  types,
  translationsService
}) => {
  const handleChange = (event: any) => {
    const selectedItemURI = event.target.value || '';
    // Skal fjerne fra array
    if (!event.target.checked) {
      input.onChange('');
    } else {
      // add object
      input.onChange(selectedItemURI);
    }
  };

  return (
    <div>
      {types?.map((type, index) => (
        <label
          key={index}
          className='form-check fdk-form-checkbox'
          htmlFor={type.uri}
        >
          <input
            type='checkbox'
            name='types'
            style={{ height: '18px', width: '18px' }}
            id={type.uri}
            value={type.uri}
            checked={input?.value === type.uri}
            onChange={handleChange}
          />
          <span className='form-check-label fdk-form-check-label mr-3' />
          <span>
            {translationsService.translate(type.label)}{' '}
            <small>({type.code})</small>
          </span>
        </label>
      ))}
    </div>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations
)(CheckboxFieldType);
