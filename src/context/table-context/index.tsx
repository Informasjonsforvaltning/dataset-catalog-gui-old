import React, { FC, PropsWithChildren, useContext, useReducer, createContext, useEffect } from 'react';

import getDate from '../../utils/helpers/date-and-time-formatter';
import getTag from '../../utils/helpers/tag-finder';
import Icon from '../../components/icon';
import Button from '../../components/inputs/button';
import { reducer, STATE } from './reducer';
import { ACTION, ACTION_TYPE } from '../actions';
import { useDatasetsContext } from '../datasets-context';
import { Dataset } from '../../utils/types';
import { CellType } from '../../components/table/table-header';
import { Props as ColumnProps } from '../../components/table/table-row/row-cell';
import { Props as RowProps } from '../../components/table/table-row';
import { useGlobalContext } from '../global-context';
import { NavigateFunction } from 'react-router-dom';

const initialState: STATE = {
  datasets: [],
  rows: [],
  headerColumns: [],
  filter: { lastModified: undefined, status: undefined },
  sort: { sortBy: 'title', sortOrder: 'ascending' },
};

// Context
const Context = createContext(initialState);
Context.displayName = 'TableContext';

// Context updater
const ContextDispatch = createContext<React.Dispatch<ACTION>>(() => {});
Context.displayName = 'TableContextDispatch';

// custom hooks
const useTableContext = () => useContext(Context);
const useTableDispatch = () => useContext(ContextDispatch);

const TableContext: FC<PropsWithChildren> = ({ children }) => {
  const datasetsContext = useDatasetsContext();
  const globalContext = useGlobalContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (datasetsContext?.datasets) {
      dispatch({ type: ACTION_TYPE.GET_TABLE_DATA, payload: { datasets: datasetsContext.datasets.slice() } });
      dispatch({
        type: ACTION_TYPE.ADD_TABLE_HEADER,
        payload: { headerColumns: getHeaderColumns(state.sort.sortBy ?? 'title', dispatch) },
      });
      dispatch({
        type: ACTION_TYPE.ADD_TABLE_ROWS,
        payload: { rows: getRows(state.datasets, globalContext.location, globalContext.navigate) ?? [] },
      });
    }
  }, [datasetsContext.datasets]);

  return (
    <Context.Provider value={state}>
      <ContextDispatch.Provider value={dispatch}>{children}</ContextDispatch.Provider>
    </Context.Provider>
  );
};

const colWidths = {
  col_1: '70%',
  col_2: '16%',
  col_3: '14%',
};

const getCorrectIcon = (sortBy: string) => {
  switch (sortBy) {
    case 'ascending':
      return <Icon name='listAscendingStroke' />;
    case 'descending':
      return <Icon name='listDescendingStroke' />;
    default:
      return <Icon name='listUnsortedStroke' />;
  }
};

const getHeaderColumns = (sortBy: string, tableDispatcher: React.Dispatch<ACTION>): CellType[] => {
  return [
    {
      sortButton: (
        <Button
          name='Title'
          btnType='transparent'
          iconPos='right'
          endIcon={getCorrectIcon(sortBy)}
          onClick={() => tableDispatcher({ type: ACTION_TYPE.SORT_DATASETS, payload: { sortBy: 'title' } })}
        />
      ),
      width: colWidths.col_1,
    },
    {
      sortButton: (
        <Button
          name='Sist endret'
          btnType='transparent'
          iconPos='right'
          endIcon={getCorrectIcon(sortBy)}
          onClick={() => tableDispatcher({ type: ACTION_TYPE.SORT_DATASETS, payload: { sortBy: 'last-modified' } })}
        />
      ),
      width: colWidths.col_2,
    },
    {
      sortButton: (
        <Button
          name='Status'
          btnType='transparent'
          iconPos='right'
          endIcon={getCorrectIcon(sortBy)}
          onClick={() => tableDispatcher({ type: ACTION_TYPE.SORT_DATASETS, payload: { sortBy: 'status' } })}
        />
      ),
      width: colWidths.col_3,
    },
  ];
};

const getRows = (datasets: Dataset[], location: string, navigate?: NavigateFunction): RowProps<ColumnProps>[] =>
  datasets.map(dataset => ({
    row: [
      { text: dataset.title?.nb ?? 'Empty', width: colWidths.col_1 },
      { text: getDate(dataset?._lastModified), width: colWidths.col_2 },
      { tag: getTag(dataset?.registrationStatus), width: colWidths.col_3 },
    ],
    onRowClick: navigate ? () => navigate(`${location}/${dataset.id}`) : () => {},
  }));

export default TableContext;
export { useTableContext, useTableDispatch };
