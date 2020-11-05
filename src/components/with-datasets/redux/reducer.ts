import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  SEARCH_DATASETS_REQUESTED,
  SEARCH_DATASETS_SUCCEEDED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  datasets: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case SEARCH_DATASETS_REQUESTED:
      return state;
    case SEARCH_DATASETS_SUCCEEDED:
      return state.set('datasets', fromJS(action.payload.datasets));
    default:
      return state;
  }
}
