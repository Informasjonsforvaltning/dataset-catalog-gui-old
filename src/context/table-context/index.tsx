import React, { FC, PropsWithChildren, useContext, useReducer, createContext, useEffect } from 'react';

import { reducer, STATE } from './reducer';
import { ACTION, ACTION_TYPE } from '../actions';
import { useDatasetsContext } from '../datasets-context';

const initialState: STATE = {
  datasets: [],
  datasetsView: [],
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
const useSearchDispatch = () => useContext(ContextDispatch);

const TableContext: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const datasetsContext = useDatasetsContext();

  useEffect(() => {
    if (datasetsContext?.datasets) {
      dispatch({ type: ACTION_TYPE.GET_TABLE_DATA, payload: { datasets: datasetsContext.datasets } });
      dispatch({ type: ACTION_TYPE.ADD_HEADER_COLUMNS });
      dispatch({ type: ACTION_TYPE.ADD_ROWS });
    }
  }, [datasetsContext.datasets, state.datasets]);

  return (
    <Context.Provider value={state}>
      <ContextDispatch.Provider value={dispatch}>{children}</ContextDispatch.Provider>
    </Context.Provider>
  );
};

export default TableContext;
export { useTableContext, useSearchDispatch };
