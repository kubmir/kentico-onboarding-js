import { fetchFactory } from '../factories/fetchFactory';
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

const prepareDependencies = (): IDeleteNoteDependencies => ({
  apiPrefix: process.env.API_URL,
  sendRequest,
  onDeletingStarted: startDeletingNoteFromServer,
  onDeletingError: deletingNoteFromServerFailed,
  onDeletingSuccessful: deletingNoteFromServerSuccess,
});

export const deleteServerNote = (noteId: Guid) =>
  deleteNoteFactory(prepareDependencies())(noteId);
