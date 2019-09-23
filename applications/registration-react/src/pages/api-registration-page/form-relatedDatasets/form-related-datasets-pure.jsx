import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import localization from '../../../lib/localization';
import Helptext from '../../../components/helptext/helptext.component';
import { InputTagsDatasetsField } from '../field-tagsinput-datasets/field-tagsinput-datasets.components';

export const FormRelatedDatasetsPure = ({ orgPath, referencedDatasets }) => (
  <form>
    <div className="form-group">
      <Helptext
        title={
          localization.schema.apiDatasetReferences.helptext.datasetReferences
        }
        term="Related_dataset"
      />
      <Field
        name="datasetUris"
        type="text"
        component={InputTagsDatasetsField}
        label="datasetReferences"
        fieldLabel={localization.getLanguage()}
        orgPath={orgPath}
        referencedDatasets={referencedDatasets}
      />
    </div>
  </form>
);

FormRelatedDatasetsPure.defaultProps = {
  orgPath: null,
  referencedDatasets: null
};

FormRelatedDatasetsPure.propTypes = {
  orgPath: PropTypes.string,
  referencedDatasets: PropTypes.array
};