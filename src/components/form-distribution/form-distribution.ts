import { reduxForm } from 'redux-form';
import _throttle from 'lodash/throttle';

import FormDistributionPure from './form-distribution-pure';
import validate from './form-distribution-validations';
import { asyncValidateDatasetInvokePatch } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';

const formConfigurer = reduxForm({
  form: 'distribution',
  validate: validate as any,
  shouldAsyncValidate: () => true, // override default, save even if sync validation fails
  asyncValidate: _throttle(asyncValidateDatasetInvokePatch, 250)
});

export const FormDistribution = formConfigurer(FormDistributionPure);
