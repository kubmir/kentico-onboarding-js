import { IAction } from '../models/IAction';
import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IStoreState } from '../models/IStoreState';

declare global {
  type Guid = string;
  type HttpMethods = 'GET' | 'POST' | 'DELETE' | 'PUT';
  type AsyncActionCreator = ActionCreator<ThunkAction<Promise<IAction>, IStoreState, null>>;
}
