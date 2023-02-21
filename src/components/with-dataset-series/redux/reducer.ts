import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  LIST_DATASET_SERIES_REQUESTED,
  LIST_DATASET_SERIES_SUCCEEDED,
  LIST_DATASET_SERIES_FAILED,
  SEARCH_DATASET_SERIES_REQUESTED,
  SEARCH_DATASET_SERIES_SUCCEEDED,
  SEARCH_DATASET_SERIES_FAILED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  datasetSeries: [],
  datasetSeriesSuggestions: [],
  isLoadingDatasetSeries: false,
  isLoadingDatasetSeriesSuggestions: false
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case LIST_DATASET_SERIES_REQUESTED:
      return state
        .set('datasetSeries', fromJS([]))
        .set('isLoadingDatasetSeries', true);
    case LIST_DATASET_SERIES_SUCCEEDED:
      return state
        .set('datasetSeries', fromJS(action.payload.datasetSeries))
        .set('isLoadingDatasetSeries', false);
    case LIST_DATASET_SERIES_FAILED:
      return state.set('isLoadingDatasetSeries', false);
    case SEARCH_DATASET_SERIES_REQUESTED:
      return state
        .set('datasetSeriesSuggestions', fromJS([]))
        .set('isLoadingDatasetSeriesSuggestions', true);
    case SEARCH_DATASET_SERIES_SUCCEEDED:
      return state
        .set('datasetSeriesSuggestions', fromJS(action.payload.datasetSeries))
        .set('isLoadingDatasetSeriesSuggestions', false);
    case SEARCH_DATASET_SERIES_FAILED:
      return state.set('isLoadingDatasetSeriesSuggestions', false);
    default:
      return state;
  }
}
