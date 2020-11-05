import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { authService } from '../../../services/auth/auth-service';

import { getConfig } from '../../../config';

import { SEARCH_DATASETS_REQUESTED } from './actions-types';
import * as actions from './actions';

import type { Dataset } from '../../../types';

function* searchRequested({
  payload: { searchRequest }
}: ReturnType<typeof actions.searchDatasetsRequested>) {
  try {
    const auth = yield call(authService.getAuthorizationHeader);

    const { data } = yield call(
      axios.post,
      `${getConfig().registrationApi.host}/search`,
      searchRequest,
      { headers: { Authorization: auth } }
    );

    if (data?.datasets) {
      yield put(actions.searchDatasetsSucceeded(data.datasets as Dataset[]));
    } else {
      yield put(
        actions.searchDatasetsFailed(
          'An error occurred during an attempt to search the Dataset Catalog.'
        )
      );
    }
  } catch (error) {
    yield put(actions.searchDatasetsFailed(error));
  }
}

export default function* saga() {
  yield all([takeLatest(SEARCH_DATASETS_REQUESTED, searchRequested)]);
}
