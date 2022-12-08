import { ACTION, ACTION_TYPE } from '../actions';
import { produce } from 'immer';
import { ThemeProfile } from '@fellesdatakatalog/theme';
import { NavigateFunction } from 'react-router-dom';

type STATE = { theme: ThemeProfile; location: string; navigate?: NavigateFunction };

const reducer = produce((state: STATE, action: ACTION) => {
  switch (action.type) {
    case ACTION_TYPE.CHANGE_THEME:
      state.theme = action.payload.theme;
      return state;
    case ACTION_TYPE.ADD_LOCATION:
      state.location = action.payload.location;
      return state;
    case ACTION_TYPE.ADD_NAVIGATE:
      state.navigate = action.payload.navigate;
      return state;
    default:
      return state;
  }
});

export { STATE, reducer };
