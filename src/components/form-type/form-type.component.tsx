import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Helptext from '../helptext/helptext.component';
import CheckBoxFieldType from './field-checkbox-type/field-checkbox.component';
import { typeValues } from '../dataset-registration-form/dataset-registration-page.logic';

interface ExternalProps {
  types: any[];
}

interface Props extends ExternalProps, TranslationsProps {
  syncErrors: any;
  type: any;
  isReadOnly: boolean;
}

const FormType: FC<Props> = ({
  syncErrors,
  isReadOnly,
  type,
  types,
  translationsService
}) => (
  <form>
    <div className='form-group mb-0'>
      <Helptext
        title={translationsService.translate('schema.type.helptext.type')}
        term='Dataset_type'
      />
      {!isReadOnly && (
        <Field name='type' component={CheckBoxFieldType} types={types} />
      )}
      {isReadOnly && (
        <div className='pl-3'>{typeValues(type.values, types)}</div>
      )}
      {syncErrors?.errorType && (
        <div className='alert alert-danger mt-3'>{syncErrors.errorType}</div>
      )}
    </div>
  </form>
);

export default compose<FC>(memo, withTranslations)(FormType);
