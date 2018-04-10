import { fetchFactory } from '../thunkFactories/fetchFactories';
import { HttpMethods } from '../../enums/HttpMethods';
import { getNotesFactory } from '../thunkFactories/getNotesFactory';
import { IServerNote } from '../../models/IServerNote';
import { injectFetchWithApiPrefix } from './fetchInjection';

const sendRequest = fetchFactory<IServerNote[]>(injectFetchWithApiPrefix, HttpMethods.GET);

export const getAllNotes = () =>
  getNotesFactory({ sendRequest });
