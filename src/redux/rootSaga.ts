import { all } from 'redux-saga/effects';

import enhetsregisteretSaga from '../components/with-enhetsregisteret/redux/saga';
import datasetSearchSaga from '../components/with-datasets/redux/saga';

export default function* saga() {
  yield all([enhetsregisteretSaga(), datasetSearchSaga()]);
}
