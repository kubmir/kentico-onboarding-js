import { fetchFactory } from '../thunkFactories/fetchFactory';
import { API_PREFIX } from '../../constants/apiPrefix';
import {
  deletingNoteFromServerFailed,
  deletingNoteFromServerSuccess,
  startDeletingNoteFromServer
} from '../simpleActionCreators/deleteNoteActionCreators';
import {
  deleteNoteFactory,
  IDeleteNoteDependencies
} from '../thunkFactories/deleteNoteFactory';

const sendRequest = fetchFactory(fetch);

const prepareDependencies = (): IDeleteNoteDependencies => ({
  apiPrefix: API_PREFIX,
  sendRequest,
  onDeletingStarted: startDeletingNoteFromServer,
  onDeletingError: deletingNoteFromServerFailed,
  onDeletingSuccessful: deletingNoteFromServerSuccess,
});

export const deleteServerNote = (noteId: Guid): Thunk =>
  deleteNoteFactory(prepareDependencies())(noteId);
