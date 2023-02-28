import {
  LIST_DATASET_SERIES_REQUESTED,
  LIST_DATASET_SERIES_SUCCEEDED,
  LIST_DATASET_SERIES_FAILED
} from './actions-types';

import type { Dataset } from '../../../types';

export function listDatasetSeriesRequested(catalogId: string, size?: number) {
  return {
    type: LIST_DATASET_SERIES_REQUESTED,
    payload: {
      catalogId,
      size
    }
  };
}

export function listDatasetSeriesSucceeded(datasetSeries: Dataset[]) {
  return {
    type: LIST_DATASET_SERIES_SUCCEEDED,
    payload: {
      datasetSeries
    }
  };
}

export function listDatasetSeriesFailed(message: string) {
  return {
    type: LIST_DATASET_SERIES_FAILED,
    payload: {
      message
    }
  };
}
