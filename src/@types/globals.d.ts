import { IAction } from '../models/IAction';
import { ThunkAction } from 'redux-thunk';
import { IStoreState } from '../models/IStoreState';

declare global {
  type Guid = string;
  type Thunk = ThunkAction<Promise<IAction>, IStoreState, any>;
}
