import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';

import localization from '../../../lib/localization';

import Helptext from '../../../components/helptext/helptext.component';
import InformationModel from './information-model/information-model.component';

export const FormInformationModelPure = ({ languages }) => (
  <form>
    <div className="form-group">
      {
        <div className="mt-4">
          <div className="form-group">
            <Helptext
              title={
                localization.schema.informationModel.helptext.informationModel
              }
              term="Dataset_informationModel"
            />
            <FieldArray
              name="informationModel"
              component={InformationModel}
              titleLabel={localization.schema.informationModel.titleLabel}
              linkLabel={localization.schema.informationModel.linkLabel}
              languages={languages}
            />
          </div>
        </div>
      }
    </div>
  </form>
);

FormInformationModelPure.defaultProps = {
  languages: []
};

FormInformationModelPure.propTypes = {
  languages: PropTypes.array
};
