import { fetchFactory } from '../factories/fetchFactory';
import { API_PREFIX } from '../../constants/apiPrefix';
import {
  deletingNoteFromServerFailed,
  deletingNoteFromServerSuccess,
  startDeletingNoteFromServer
} from '../deleteNoteActionCreators';
import { deleteNoteFactory } from '../factories/deleteNoteFactory';

const sendRequest = fetchFactory(fetch);

const configurationObject = {
  sendRequest,
  onDeletingStarted: startDeletingNoteFromServer,
  onDeletingError: deletingNoteFromServerFailed,
  onDeletingSuccessful: deletingNoteFromServerSuccess,
};

export const deleteServerNote = (noteId: Guid) =>
  deleteNoteFactory({
    apiAddress: API_PREFIX + '/' + noteId,
    noteId,
    ...configurationObject,
  });
