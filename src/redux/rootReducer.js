import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import catalog from './modules/catalog';
import { datasetsReducer } from './modules/datasets';
import catalogs from './modules/catalogs';
import { apiFormStatusReducer } from './modules/api-form-status';
import inputLanguage from '../components/language-picker/redux/reducer';
import { datasetFormStatus } from './modules/dataset-form-status';
import { referenceDataReducer } from './modules/referenceData';
import EnhetsregisteretReducer from '../components/with-enhetsregisteret/redux/reducer';
import DatsetSearchReducer from '../components/with-datasets/redux/reducer';

const rootReducer = combineReducers({
  form: formReducer,
  catalog,
  datasets: datasetsReducer,
  catalogs,
  apiFormStatus: apiFormStatusReducer,
  datasetFormStatus,
  referenceData: referenceDataReducer,
  inputLanguage,
  EnhetsregisteretReducer,
  DatsetSearchReducer
});

export default rootReducer;
