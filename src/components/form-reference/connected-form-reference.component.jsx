import { getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';

import { ConfiguredFormReference } from './configured-form-reference';

const mapStateToProps = (
  state,
  {
    datasetItem: {
      references = [
        {
          referenceType: { uri: null, code: null, prefLabel: {} },
          source: { uri: null, prefLabel: {} }
        }
      ],
      relations = [{ uri: null, prefLabel: {} }],
      inSeries = null
    }
  }
) => ({
  initialValues: {
    references,
    relations,
    inSeries
  },
  syncErrors: getFormSyncErrors('reference')(state)
});

export const ConnectedFormReference = connect(mapStateToProps)(
  ConfiguredFormReference
);
