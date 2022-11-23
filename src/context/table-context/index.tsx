/**
 * Dependency: datsets-context
 */

import React, { FC, PropsWithChildren, useContext, useEffect, useReducer, createContext } from 'react';
import { Props as ColumnProps } from '../../components/table/table-row/row-cell';
import { Props as RowProps } from '../../components/table/table-row';

import { reducer, STATE } from './reducer';
import { ACTION, ACTION_TYPE } from '../actions';
import getDate from '../../utils/helpers/date-and-time-formatter';
import getTag from '../../utils/helpers/tag-finder';
import Table from '../../components/table';
import Button from '../../components/inputs/button';
import Icon from '../../components/icon';
import { useDatasetsContext } from '../datasets-context';
import { useLocation, useNavigate } from 'react-router-dom';

const initialState: STATE = {
  datasets: [],
  rows: [],
  headerColumns: [],
  searchTerm: '',
  filter: ['', ''],
  sort: ['', 'default'],
};

// Context
const Context = createContext(initialState);
Context.displayName = 'TableContext';

// Context updater
const ContextDispatch = createContext<React.Dispatch<ACTION>>(() => {});
Context.displayName = 'TableContextDispatch';

// custom hooks
const useTableContext = () => useContext(Context);
const useSearchDispatch = () => useContext(ContextDispatch);

const TableContext: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // initialize datasets
  /*   const asyncDispatch = () => {
    if (state.catalogId) {
      dispatch({ type: ACTION_TYPE.LOADING });
      getDatasets(state.catalogId)
        .then(datasets => {
          dispatch({ type: ACTION_TYPE.FINISHED, payload: datasets });
        })
        .catch(err => {
          dispatch({ type: ACTION_TYPE.ERROR });
          console.error('DatasetsContext failed on getDatasets()!', err);
        });
    }
  }; */

  /*   useEffect(asyncDispatch, [state.catalogId]); */
  const datasetsState = useDatasetsContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRowClick = (id: string) => navigate(`${location.pathname}/${id}`);

  const colWidths = {
    col_1: '70%',
    col_2: '16%',
    col_3: '14%',
  };

  const cols = [
    {
      sortButton: (
        <Button name='Title' type='transparent' iconPos='right' endIcon={<Icon name='listUnsortedStroke' />} />
      ),
      width: colWidths.col_1,
    },
    {
      sortButton: (
        <Button name='Sist endret' type='transparent' iconPos='right' endIcon={<Icon name='listUnsortedStroke' />} />
      ),
      width: colWidths.col_2,
    },
    {
      sortButton: (
        <Button name='Status' type='transparent' iconPos='right' endIcon={<Icon name='listUnsortedStroke' />} />
      ),
      width: colWidths.col_3,
    },
  ];

  const rows: RowProps<ColumnProps>[] = datasetsState.datasets.map(dataset => ({
    row: [
      { text: dataset.title?.nb, width: colWidths.col_1 },
      { text: getDate(dataset._lastModified), width: colWidths.col_2 },
      { tag: getTag(dataset.registrationStatus), width: colWidths.col_3 },
    ],
    onRowClick: () => handleRowClick(dataset.id),
  }));

  return (
    <Context.Provider value={state}>
      <ContextDispatch.Provider value={dispatch}>{children}</ContextDispatch.Provider>
    </Context.Provider>
  );
};

export default TableContext;
export { useTableContext, useSearchDispatch };
