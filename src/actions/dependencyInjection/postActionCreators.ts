import { fetchFactory } from '../thunkFactories/fetchFactory';
import {
  IPostDependencies,
  IPostNoteDependencies,
  postNoteFactory,
  repostNoteFactory
} from '../thunkFactories/postNoteFactory';
import { API_PREFIX } from '../../constants/apiPrefix';
import { convertNote } from '../../utils/noteConverter';
import { generateId } from '../../utils/generateId';

const sendRequest = fetchFactory(fetch);

const preparePostDependencies = (): IPostDependencies => ({
  apiAddress: API_PREFIX,
  sendRequest,
  convertNote,
});

const preparePostNoteDependencies = (): IPostNoteDependencies => (
  {
    ...preparePostDependencies(),
    generateLocalId: generateId,
  }
);

export const addNewNote = (newNoteText: string) =>
  postNoteFactory(preparePostNoteDependencies())({ text: newNoteText });

export const retryAddNewNote = (localId: Guid, newNoteText: string) =>
  repostNoteFactory(preparePostDependencies())({ text: newNoteText }, localId);
