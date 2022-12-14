import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ORGANIZATION_REQUESTED,
  GET_ORGANIZATION_SUCCEEDED,
  GET_ORGANIZATION_FAILED
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  organization: undefined,
  isLoadingOrganization: false
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_ORGANIZATION_REQUESTED:
      return state
        .set('organization', undefined)
        .set('isLoadingOrganization', true);
    case GET_ORGANIZATION_SUCCEEDED:
      return state
        .set('organization', fromJS(action.payload.organization))
        .set('isLoadingOrganization', false);
    case GET_ORGANIZATION_FAILED:
      return state.set('isLoadingOrganization', false);
    default:
      return state;
  }
}
