import { Dataset } from '../utils/types';
import { FILTER_TYPE, SORT_TYPE } from './table-context/reducer';

enum STATUS {
  IDLE = 'idle',
  ERROR = 'error',
  LOADING = 'loading',
  FINISHED = 'finished',
}

enum ACTION_TYPE {
  IDLE,
  ERROR,
  LOADING,
  ADD_ROWS,
  FINISHED,
  ADD_DATASET,
  GET_DATASET,
  GET_DATASETS,
  GET_TABLE_DATA,
  SORT_DATASETS,
  REMOVE_DATASET,
  ADD_CATALOG_ID,
  FILTER_DATASETS,
  ADD_HEADER_COLUMNS,
  SEARCH_IN_DATASETS,
}

type ACTION =
  | { type: ACTION_TYPE.IDLE }
  | { type: ACTION_TYPE.ERROR }
  | { type: ACTION_TYPE.LOADING }
  | { type: ACTION_TYPE.ADD_ROWS }
  | { type: ACTION_TYPE.GET_DATASETS }
  | { type: ACTION_TYPE.GET_TABLE_DATA }
  | { type: ACTION_TYPE.ADD_HEADER_COLUMNS }
  | { type: ACTION_TYPE.FINISHED; payload: Dataset[] }
  | { type: ACTION_TYPE.ADD_CATALOG_ID; payload: string }
  | { type: ACTION_TYPE.ADD_DATASET; payload: { dataset: Dataset } }
  | { type: ACTION_TYPE.GET_DATASET; payload: { datasetId: string } }
  | { type: ACTION_TYPE.REMOVE_DATASET; payload: { catalogId: string } }
  | {
      type: ACTION_TYPE.FILTER_DATASETS;
      payload: FILTER_TYPE;
    }
  | {
      type: ACTION_TYPE.SORT_DATASETS;
      payload: SORT_TYPE;
    };

export { ACTION, ACTION_TYPE, STATUS };
