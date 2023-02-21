import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import AuthService from '../../../services/auth/auth-service';

import {
  LIST_DATASET_SERIES_REQUESTED,
  SEARCH_DATASET_SERIES_REQUESTED
} from './actions-types';
import * as actions from './actions';

import type { Dataset } from '../../../types';
import { RegistrationStatus } from '../../../types/enums';

const { FDK_REGISTRATION_BASE_URI, SEARCH_FULLTEXT_HOST } = env;

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
      `${FDK_REGISTRATION_BASE_URI}/catalogs/${catalogId}/datasets`, // endre her til å spørre etter serier
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
          'An error occurred during an attempt to list dataset Series.'
        )
      );
    }
  } catch (error: any) {
    yield put(actions.listDatasetSeriesFailed(error));
  }
}

function* searchDatasetSeriesRequested({
  payload: {
    query,
    searchType,
    includeStatus,
    catalogIds: catalogIDs,
    includeExternalDatasets
  }
}: ReturnType<typeof actions.searchDatasetSeriesRequested>) {
  try {
    const authorization: string = yield call([
      AuthService,
      AuthService.getAuthorizationHeader
    ]);

    const { registration, fulltext } = yield all({
      registration: call(
        axios.post,
        `${FDK_REGISTRATION_BASE_URI}/search`,
        { query, searchType, catalogIDs },
        { headers: { authorization } }
      ),
      fulltext: includeExternalDatasets
        ? call(axios.get, `${SEARCH_FULLTEXT_HOST}/suggestion/datasets`, {
            headers: { authorization },
            params: { q: query }
          })
        : null
    }); // Vet ikke helt om dette skal være med

    const internalDatasetUris: string[] =
      registration?.data?.datasets?.map(({ uri }: Dataset) => uri) ?? []; // Skal det være datasets her eller ikke? Hvor kommer data greia fra?

    const internalDatasets =
      registration?.data?.datasets?.reduce(
        (previous: any, current: any) =>
          includeStatus?.includes(current?.registrationStatus) ?? true
            ? [...previous, { ...current, internal: true }]
            : previous,
        [] as Dataset[]
      ) ?? [];

    const externalDatasets =
      fulltext?.data?.suggestions?.reduce(
        (previous: any, current: any) =>
          !internalDatasetUris.includes(current.uri)
            ? [
                ...previous,
                {
                  ...current,
                  internal: false,
                  registrationStatus: RegistrationStatus.PUBLISH
                }
              ]
            : previous,
        [] as Dataset[]
      ) ?? [];

    const datasetSeries: Dataset[] = [...internalDatasets, ...externalDatasets];

    if (Array.isArray(datasetSeries)) {
      yield put(actions.searchDatasetSeriesSucceeded(datasetSeries));
    } else {
      yield put(
        actions.searchDatasetSeriesFailed(
          'An error occurred during an attempt to search the dataset catalog. (series)'
        )
      );
    }
  } catch (error: any) {
    yield put(actions.searchDatasetSeriesFailed(error));
  }
}

export default function* saga() {
  yield all([
    takeLatest(LIST_DATASET_SERIES_REQUESTED, listDatasetSeriesRequested),
    takeLatest(SEARCH_DATASET_SERIES_REQUESTED, searchDatasetSeriesRequested)
  ]);
}
