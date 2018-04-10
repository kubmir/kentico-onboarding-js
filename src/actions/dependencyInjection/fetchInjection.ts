import { IRequestInit } from '../thunkFactories/fetchFactories';
import { API_PREFIX } from '../../constants/apiPrefix';

export const injectFetchWithApiPrefix = (requestInit: IRequestInit) =>
  fetch(API_PREFIX, requestInit);
