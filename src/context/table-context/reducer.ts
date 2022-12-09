import { produce } from 'immer';

import { Dataset } from '../../utils/types';
import { ACTION, ACTION_TYPE } from '../actions';
import { Props as ColumnProps } from '../../components/table/table-row/row-cell';
import { Props as RowProps } from '../../components/table/table-row';
import { CellType } from '../../components/table/table-header';

import { RegistrationStatus } from '../../utils/types/enums';

type SORT_ORDER = 'ascending' | 'descending';
type FILTER_TYPE = { lastModified?: Date | undefined; status?: RegistrationStatus | undefined; searchTerm?: string };
type SORT_BY_TYPE = 'title' | 'last-modified' | 'status';
type SORT_TYPE = { sortBy: SORT_BY_TYPE; sortOrder?: SORT_ORDER };

type STATE = {
  datasets: Dataset[];
  headerColumns: CellType[];
  rows: RowProps<ColumnProps>[];
  filter: FILTER_TYPE;
  sort: SORT_TYPE;
};

const reducer = produce((state: STATE, action: ACTION) => {
  switch (action.type) {
    case ACTION_TYPE.GET_TABLE_DATA:
      state.datasets = action.payload.datasets;
      console.log(state.datasets);
      return state;
    case ACTION_TYPE.ADD_TABLE_HEADER:
      state.headerColumns = action.payload.headerColumns;
      return state;
    case ACTION_TYPE.ADD_TABLE_ROWS:
      state.rows = action.payload.rows;
      return state;
    case ACTION_TYPE.FILTER_DATASETS:
      state.datasets = getFilteredDatasets(state.datasets, state.filter);
      if (state.sort) state.datasets = sortDatasetsView(state.datasets, state.sort);
      return state;
    case ACTION_TYPE.SORT_DATASETS:
      if (action.payload.sortBy && action.payload.sortBy !== state.sort.sortBy) {
        state.sort.sortBy = action.payload.sortBy;
        state.sort.sortOrder = 'ascending';
      } else {
        if (state.sort.sortOrder === 'ascending') state.sort.sortOrder = 'descending';
        else state.sort.sortOrder === 'descending';
      }
      state.datasets = sortDatasetsView(state.datasets, state.sort);
      return state;
    default:
      return state;
  }
});

const getFilteredDatasets = (datasets: Dataset[], filter?: FILTER_TYPE, searchTerm?: string) => {
  let datasetsView = datasets;
  if (filter) {
    if (filter.status) datasetsView = datasets.filter(dataset => dataset.registrationStatus === filter.status);
    else if (filter.lastModified)
      datasetsView = datasets.filter(dataset => dataset._lastModified.getTime() === filter.lastModified!.getTime());
  } else if (searchTerm)
    datasetsView = datasets.filter(
      dataset => dataset.title?.nb === searchTerm || dataset.title?.nn.startsWith(searchTerm)
    );
  return datasetsView;
};

const sortDatasetsView = (datasets: Dataset[], sort: SORT_TYPE) => {
  switch (sort.sortBy) {
    case 'status':
      console.log(datasets);
      const a = datasets.sort((datasetA, datasetB) => {
        if (sort.sortOrder === 'ascending') {
          return ascendSort(datasetA.registrationStatus, datasetB.registrationStatus);
        } else {
          return descendSort(datasetA.registrationStatus, datasetB.registrationStatus);
        }
      });
      console.log(a);
      break;
    case 'last-modified':
      datasets.sort((datasetA, datasetB) => {
        if (sort.sortOrder === 'ascending') {
          return ascendSort(datasetA._lastModified, datasetB._lastModified);
        } else {
          return descendSort(datasetA._lastModified, datasetB._lastModified);
        }
      });
      break;
    default:
      datasets.sort((datasetA, datasetB) => {
        if (sort.sortOrder === 'ascending') {
          return ascendSort(datasetA.title?.nb ?? 'Empty', datasetB.title?.nb ?? 'Empty');
        } else {
          return descendSort(datasetA.title?.nb ?? 'Empty', datasetB.title?.nb ?? 'Empty');
        }
      });
  }
  return datasets;
};

const ascendSort = (A: string | Date, B: string | Date): number => {
  if (typeof A === typeof Date) {
    A = A.toString();
    B = B.toString();
  }
  if (A < B) return -1;
  if (A > B) return 1;
  return 0;
};

const descendSort = (A: string | Date, B: string | Date): number => {
  if (A > B) return -1;
  if (A < B) return 1;
  return 0;
};

export { STATE, SORT_TYPE, FILTER_TYPE, reducer };
