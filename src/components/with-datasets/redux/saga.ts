import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { authService } from '../../../services/auth/auth-service';

import { getConfig } from '../../../config';

import { DATASETS_REQUESTED } from './actions-types';
import * as actions from './actions';

import type { Dataset } from '../../../types';

function* searchRequested({
  payload: { searchRequest }
}: ReturnType<typeof actions.datasetsRequested>) {
  try {
    const auth = yield call(authService.getAuthorizationHeader);

    const { data } = yield axios({
      method: 'post',
      url: `${getConfig().registrationApi.host}/search`,
      data: searchRequest,
      headers: { Authorization: auth }
    });

    if (data?.datasets) {
      yield put(actions.datasetsSucceeded(data.datasets as Dataset[]));
    } else {
      yield put(
        actions.datasetsFailed(
          'An error occurred during an attempt to search the Dataset Catalog.'
        )
      );
    }
  } catch (error) {
    yield put(actions.datasetsFailed(error));
  }
}

export default function* saga() {
  yield all([takeLatest(DATASETS_REQUESTED, searchRequested)]);
}
