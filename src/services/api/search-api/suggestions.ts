import { searchApiGet } from './host';

export const extractSuggestions = (searchResponse: any) =>
  searchResponse.suggestions ?? [];

export const getDataserviceSuggestions = (params: any) =>
  searchApiGet('/suggestions/dataservices', params);

export const getConceptSuggestions = (params: any) =>
  searchApiGet('/suggestions/concepts', params);

export const getInformationModelSuggestions = (params: any) =>
  searchApiGet('/suggestions/informationmodels', params);
