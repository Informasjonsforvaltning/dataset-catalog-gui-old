import {
  SEARCH_DATASETS_REQUESTED,
  SEARCH_DATASETS_SUCCEEDED,
  SEARCH_DATASETS_FAILED
} from './actions-types';

import type { SearchRequest, Dataset } from '../../../types';

export function searchDatasetsRequested(searchRequest: SearchRequest) {
  return {
    type: SEARCH_DATASETS_REQUESTED,
    payload: {
      searchRequest
    }
  };
}

export function searchDatasetsSucceeded(datasets: Dataset[]) {
  return {
    type: SEARCH_DATASETS_SUCCEEDED,
    payload: {
      datasets
    }
  };
}

export function searchDatasetsFailed(message: string) {
  return {
    type: SEARCH_DATASETS_FAILED,
    payload: {
      message
    }
  };
}
