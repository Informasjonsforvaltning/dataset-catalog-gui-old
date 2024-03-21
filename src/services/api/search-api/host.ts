import axios from 'axios';
import cleanDeep from 'clean-deep';

import env from '../../../env';

const { SEARCH_HOST } = env;

interface Props {
  path: string;
  method: any;
  params?: any;
}

export const searchApi = ({ path, method, params }: Props) =>
  axios({
    url: `${SEARCH_HOST}${path}`,
    method,
    params
  })
    .then(({ data }) => cleanDeep(data))
    .catch(() => null);

export const searchApiGet = (path: string, params: any) =>
  searchApi({ path, method: 'GET', params });
