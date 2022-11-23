import { produce } from 'immer';

import { Dataset } from '../../utils/types';
import { ACTION, ACTION_TYPE } from '../actions';
import { Props as ColumnProps } from '../../components/table/table-row/row-cell';
import { Props as RowProps } from '../../components/table/table-row';
import { Props as HeaderColumnProps } from '../../components/table/table-header';

type SORT_ORDER = 'default' | 'ascending' | 'descending';

type STATE = {
  datasets: Dataset[];
  headerColumns: HeaderColumnProps[];
  rows: RowProps<ColumnProps>[];
  searchTerm: string;
  filter: [lastModiedBy: string, status: string];
  sort: [sortBy: string, sortOrder: SORT_ORDER];
};

const reducer = produce((state: STATE, action: ACTION) => {
  switch (action.type) {
    case ACTION_TYPE.LOADING:
      return state;
    case ACTION_TYPE.FINISHED:
      state.datasets = action.payload;
      return state;
    case ACTION_TYPE.ERROR:
      return state;
    default:
      return state;
  }
});

export { STATE, reducer };
