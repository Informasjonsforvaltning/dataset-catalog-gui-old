import { connect } from 'react-redux';
import { compose } from 'recompose';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import _throttle from 'lodash/throttle';

import { licenseType, textType } from '../../../schemaTypes';
import { FormDistributionPure } from './form-distribution-pure';
import validate from './form-distribution-validations';
import { asyncValidateDatasetInvokePatch } from '../formsLib/asyncValidateDatasetInvokePatch';

export const distributionTypes = values => {
  let distributions = null;
  if (values && values.length > 0) {
    distributions = values.map(item => ({
      id: item.id ? item.id : '',
      description: item.description ? item.description : textType,
      accessURL: item.accessURL ? item.accessURL : [],
      license: item.license ? item.license : licenseType,
      conformsTo: item.conformsTo ? item.conformsTo : [],
      page: item.page && item.page.length > 0 ? item.page : [licenseType],
      format: item.format ? item.format : [],
      type: item.type ? item.type : '',
      accessService: item.accessService ? item.accessService : null
    }));
  } else {
    distributions = [];
  }
  return distributions;
};

const mapStateToProps = (state, ownProps) => {
  const { datasetItem, openLicenseItems } = ownProps;
  return {
    initialValues: {
      distribution: distributionTypes(_.get(datasetItem, 'distribution')),
      openLicenseItems
    }
  };
};

const formConfigurer = reduxForm({
  form: 'distribution',
  validate,
  asyncValidate: _throttle(asyncValidateDatasetInvokePatch, 250)
});

const enhance = compose(
  connect(mapStateToProps),
  formConfigurer
);

export const FormDistribution = enhance(FormDistributionPure);