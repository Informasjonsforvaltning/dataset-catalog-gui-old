import _ from 'lodash';
import { withProps } from 'recompose';
import { licenseType, textType } from '../../../schemaTypes';

const distributionTypes = values => {
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

const createProps = ({ datasetItem }) => ({
  initialValues: {
    distribution: distributionTypes(_.get(datasetItem, 'distribution'))
  }
});

export const propsEnhancer = withProps(createProps);