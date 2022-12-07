/**
 * Dependency: datsets-context
 */

import React, { FC, PropsWithChildren, useContext, useReducer, createContext, useEffect } from 'react';

import { reducer, STATE } from './reducer';
import { ACTION, ACTION_TYPE } from '../actions';
import { useDatasetsContext } from '../datasets-context';

const initialState: STATE = {
  datasets: [],
  datasetsView: [],
  rows: [],
  headerColumns: { cols: [] },
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
const useSearchDispatch = () => useContext(ContextDispatch);

const TableContext: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => dispatch({ type: ACTION_TYPE.GET_TABLE_DATA }), useDatasetsContext().datasets);

  return (
    <Context.Provider value={state}>
      <ContextDispatch.Provider value={dispatch}>{children}</ContextDispatch.Provider>
    </Context.Provider>
  );
};

export default TableContext;
export { useTableContext, useSearchDispatch };
