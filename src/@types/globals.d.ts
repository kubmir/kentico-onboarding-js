import { IAction } from '../models/IAction';
import { ThunkAction } from 'redux-thunk';
import { IStoreState } from '../models/IStoreState';

declare global {
  type Guid = string;
  type HttpMethods = 'GET' | 'POST' | 'DELETE' | 'PUT';
  type Thunk = ThunkAction<Promise<IAction>, IStoreState, any>;
  type FailedAction = 'DELETE' | 'UPDATE' | 'ADD' | '';
}
