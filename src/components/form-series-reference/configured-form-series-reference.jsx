import { reduxForm } from 'redux-form';

import { yupValidation } from '../../lib/yupValidation';

import FormSeriesReference from './form-series-reference.component';
import schema from './form-series-reference-validations';
import { asyncValidateDatasetInvokePatch } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';

const config = {
  form: 'series-reference',
  validate: values => yupValidation(schema, values),
  asyncValidate: asyncValidateDatasetInvokePatch
};

export const ConfiguredFormSeriesReference =
  reduxForm(config)(FormSeriesReference);
