import { fetchFactory } from '../factories/fetchFactory';
import { API_PREFIX } from '../../constants/apiPrefix';
import {
  deletingNoteFromServerFailed,
  deletingNoteFromServerSuccess,
  startDeletingNoteFromServer
} from '../deleteNoteActionCreators';
import {
  deleteNoteFactory,
  IDeleteNoteDependencies
} from '../factories/deleteNoteFactory';

const sendRequest = fetchFactory(fetch);

const prepareDependencies = (noteId: Guid): IDeleteNoteDependencies => ({
  apiAddress: API_PREFIX + '/' + noteId,
  noteId,
  sendRequest,
  onDeletingStarted: startDeletingNoteFromServer,
  onDeletingError: deletingNoteFromServerFailed,
  onDeletingSuccessful: deletingNoteFromServerSuccess,
});

export const deleteServerNote = (noteId: Guid) =>
  deleteNoteFactory(prepareDependencies(noteId));
