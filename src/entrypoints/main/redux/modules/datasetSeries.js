import _ from 'lodash';
import { compose } from 'redux';
import { datasetListAllPath } from '../../../../services/api/registration-api/datasets';
import { reduxFsaThunk } from '../../../../lib/redux-fsa-thunk';
import { registrationApiGet } from '../../../../services/api/registration-api/host';

export const DATASET_SERIES_REQUEST = 'DATASET_SERIES_REQUEST';
export const DATASET_SERIES_SUCCESS = 'DATASET_SERIES_SUCCESS';
export const DATASET_SERIES_FAILURE = 'DATASET_SERIES_FAILURE';
export const DATASET_SUCCESS = 'DATASET_SUCCESS';

function shouldFetch(metaState) {
  const threshold = 60 * 1000; // seconds
  return (
    !metaState ||
    (!metaState.isFetching &&
      (metaState.lastFetch || 0) < Date.now() - threshold)
  );
}

export const fetchDatasetsIfNeeded = catalogId => (dispatch, getState) =>
  shouldFetch(_.get(getState(), ['datasets', catalogId, 'meta'])) &&
  dispatch(
    reduxFsaThunk(() => registrationApiGet(datasetListAllPath(catalogId)), {
      onBeforeStart: { type: DATASET_SERIES_REQUEST, meta: { catalogId } },
      onSuccess: { type: DATASET_SERIES_SUCCESS, meta: { catalogId } },
      onError: { type: DATASET_SERIES_FAILURE, meta: { catalogId } }
    })
  );

export const datasetSuccessAction = dataset => ({
  type: DATASET_SUCCESS,
  payload: dataset
});

const initialState = {};

export function datasetSeriesReducer(state = initialState, action) {
  switch (action.type) {
    case DATASET_SERIES_REQUEST:
      return {
        ...state,
        [action.meta.catalogId]: {
          meta: {
            isFetching: true,
            lastFetch: null
          }
        }
      };
    case DATASET_SERIES_SUCCESS: {
      const objFromArray = _.get(
        action.payload,
        ['_embedded', 'datasets'],
        []
      ).reduce((accumulator, current) => {
        accumulator[current.id] = current;
        return accumulator;
      }, {});
      return {
        ...state,
        [action.meta.catalogId]: {
          items: objFromArray,
          meta: {
            isFetching: false,
            lastFetch: Date.now()
          }
        }
      };
    }
    case DATASET_SERIES_FAILURE:
      return {
        ...state,
        [action.meta.catalogId]: {
          items: [],
          meta: {
            isFetching: false,
            lastFetch: Date.now()
          }
        }
      };
    case DATASET_SUCCESS: {
      const dataset = action.payload;
      const { catalogId, id } = dataset;
      const items = _.get(state, [catalogId, 'items']); // Skulle det vært noe annet enn items her?
      return {
        ...state,
        [catalogId]: {
          items: {
            ...items,
            [id]: dataset
          }
        }
      };
    }
    default:
      return state;
  }
}

export const getDatasetSeriesItemByDatasetiId = (datasets, catalogId, id) =>
  _.get(datasets, [catalogId, 'items', id]);

export const selectorForDatasetSeriesInCatalog = catalogId => datasetsState =>
  _.get(datasetsState, [catalogId, 'items', 'datasets'], []); // Skulle det vært noe annet enn items og datasets her?

export const selectorForDataset = (catalogId, datasetId) =>
  compose(
    datasets => datasets[datasetId],
    selectorForDatasetSeriesInCatalog(catalogId)
  );
