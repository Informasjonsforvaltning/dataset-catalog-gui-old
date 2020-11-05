import { fromJS } from 'immutable';

import * as actions from './actions';
import { DATASETS_REQUESTED, DATASETS_SUCCEEDED } from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  datasets: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case DATASETS_REQUESTED:
      return state;
    case DATASETS_SUCCEEDED:
      return state.set('datasets', fromJS(action.payload.datasets));
    default:
      return state;
  }
}
