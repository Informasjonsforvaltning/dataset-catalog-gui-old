import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import _ from 'lodash';

import { datasetSuccessAction } from '../../redux/modules/datasets';
import { fetchCatalogIfNeeded } from '../../redux/modules/catalog';
import DatasetsListPagePure from './dataset-list-page-pure';
import {
  createDataset,
  datasetPath
} from '../../services/api/registration-api/datasets';
import { authService } from '../../services/auth/auth-service';

const mapRouteParams = withProps(({ match: { params } }) =>
  _.pick(params, ['catalogId'])
);

const mapStateToProps = state => {
  const { catalog } = state;
  return {
    catalog
  };
};

const createDatasetAndNavigateThunk = (
  catalogId,
  history
) => async dispatch => {
  const dataset = await createDataset(catalogId);
  dispatch(datasetSuccessAction(dataset));
  history.push(datasetPath(catalogId, dataset.id));
};

const mapDispatchToProps = (dispatch, { history }) => ({
  dispatchEnsureData: catalogId => {
    dispatch(fetchCatalogIfNeeded(catalogId));
  },
  onClickCreateDataset: catalogId =>
    dispatch(createDatasetAndNavigateThunk(catalogId, history))
});

const withReadOnly = withProps(({ catalogId }) => ({
  isReadOnly:
    !authService.hasSystemAdminPermission() &&
    !authService.hasOrganizationWritePermission(catalogId)
}));

export const enhance = compose(
  mapRouteParams,
  withReadOnly,
  connect(mapStateToProps, mapDispatchToProps)
);

export const DatasetsListPage = enhance(DatasetsListPagePure);
