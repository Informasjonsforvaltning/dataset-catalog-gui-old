import axios from 'axios';
import { getConfig } from '../config';
import get from 'lodash/get';

const publishersUrlBase = () => `${getConfig().publisherApi.host}/publisher`;

export const getAllPublishers = () => axios(publishersUrlBase()).then(r => r.data).then(extractPublishers);

export const getPublisherHierarchy = () =>
  axios.get(
    `${publishersUrlBase()}/hierarchy`,
    { headers: { authorization: getConfig().publisherApi.authorization } }
  )
    .then(r => r.data);

export const extractPublishers = searchResponse => get(searchResponse, 'hits.hits', []).map(h => h._source);
