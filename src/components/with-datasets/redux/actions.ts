import {
  DATASETS_REQUESTED,
  DATASETS_SUCCEEDED,
  DATASETS_FAILED
} from './actions-types';

import type { SearchRequest, Dataset } from '../../../types';

export function datasetsRequested(searchRequest: SearchRequest) {
  return {
    type: DATASETS_REQUESTED,
    payload: {
      searchRequest
    }
  };
}

export function datasetsSucceeded(datasets: Dataset[]) {
  return {
    type: DATASETS_SUCCEEDED,
    payload: {
      datasets
    }
  };
}

export function datasetsFailed(message: string) {
  return {
    type: DATASETS_FAILED,
    payload: {
      message
    }
  };
}
