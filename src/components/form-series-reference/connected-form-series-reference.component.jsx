import { getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';

import { ConfiguredFormSeriesReference } from './configured-form-series-reference';

const mapStateToProps = (
  state,
  { datasetItem: { seriesDatasetOrder = [] } }
) => ({
  initialValues: {
    seriesDatasetOrder
  },
  syncErrors: getFormSyncErrors('series-reference')(state)
});

export const ConnectedFormSeriesReference = connect(mapStateToProps)(
  ConfiguredFormSeriesReference
);
