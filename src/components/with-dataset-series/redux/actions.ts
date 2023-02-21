import {
  LIST_DATASET_SERIES_REQUESTED,
  LIST_DATASET_SERIES_SUCCEEDED,
  LIST_DATASET_SERIES_FAILED,
  SEARCH_DATASET_SERIES_REQUESTED,
  SEARCH_DATASET_SERIES_SUCCEEDED,
  SEARCH_DATASET_SERIES_FAILED
} from './actions-types';

import type { Dataset } from '../../../types';
import { SearchType, RegistrationStatus } from '../../../types/enums';

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

export function searchDatasetSeriesRequested(
  query: string,
  searchType: SearchType,
  catalogIds: string[],
  includeExternalDatasets?: boolean,
  includeStatus?: RegistrationStatus[]
) {
  return {
    type: SEARCH_DATASET_SERIES_REQUESTED,
    payload: {
      query,
      searchType,
      catalogIds,
      includeStatus,
      includeExternalDatasets
    }
  };
}

export function searchDatasetSeriesSucceeded(datasetSeries: Dataset[]) {
  return {
    type: SEARCH_DATASET_SERIES_SUCCEEDED,
    payload: {
      datasetSeries
    }
  };
}

export function searchDatasetSeriesFailed(message: string) {
  return {
    type: SEARCH_DATASET_SERIES_FAILED,
    payload: {
      message
    }
  };
}
