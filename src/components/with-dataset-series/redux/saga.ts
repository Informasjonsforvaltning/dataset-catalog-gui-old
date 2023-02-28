import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import AuthService from '../../../services/auth/auth-service';

import { LIST_DATASET_SERIES_REQUESTED } from './actions-types';
import * as actions from './actions';

import type { Dataset } from '../../../types';

const { FDK_REGISTRATION_BASE_URI } = env;

function* listDatasetSeriesRequested({
  payload: { catalogId, size }
}: ReturnType<typeof actions.listDatasetSeriesRequested>) {
  try {
    const authorization: string = yield call([
      AuthService,
      AuthService.getAuthorizationHeader
    ]);

    const { data } = yield call(
      axios.get,
      `${FDK_REGISTRATION_BASE_URI}/catalogs/${catalogId}/datasets?specializedType=SERIES`,
      {
        params: { size },
        headers: {
          authorization,
          accept: 'application/json',
          'cache-control': 'no-cache'
        }
      }
    );

    if (Array.isArray(data?._embedded.datasets)) {
      yield put(
        actions.listDatasetSeriesSucceeded(data._embedded.datasets as Dataset[])
      );
    } else {
      yield put(
        actions.listDatasetSeriesFailed(
          'An error occurred during an attempt to list dataset series.'
        )
      );
    }
  } catch (error: any) {
    yield put(actions.listDatasetSeriesFailed(error));
  }
}

export default function* saga() {
  yield all([
    takeLatest(LIST_DATASET_SERIES_REQUESTED, listDatasetSeriesRequested)
  ]);
}
