/**
 * Dependency: datsets-context
 */

import React, { FC, PropsWithChildren, useContext, useEffect, useReducer, createContext } from 'react';

import { reducer, STATE } from './reducer';
import { ACTION, ACTION_TYPE } from '../actions';

const initialState: STATE = {
  datasets: [],
  rows: [],
  headerColumns: { cols: [] },
  searchTerm: '',
  filter: { lastModiedBy: '', status: '' },
  sort: { sortBy: '', sortOrder: 'default' },
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

  return (
    <Context.Provider value={state}>
      <ContextDispatch.Provider value={dispatch}>{children}</ContextDispatch.Provider>
    </Context.Provider>
  );
};

export default TableContext;
export { useTableContext, useSearchDispatch };
