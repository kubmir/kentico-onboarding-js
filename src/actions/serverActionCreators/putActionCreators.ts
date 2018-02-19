import { API_PREFIX } from '../../constants/apiPrefix';
import { fetchFactory } from '../factories/fetchFactory';
import {
  IPutNoteDependencies,
  putNoteFactory
} from '../factories/putNoteFactory';
import {
  startUpdatingNoteOnServer,
  updatingNoteOnServerFailed,
  updatingNoteOnServerSuccess
} from '../actionCreators';

const sendRequest = fetchFactory(fetch);

const prepareDependencies = (newNoteText: string, noteId: Guid): IPutNoteDependencies => (
  {
    apiAddress: API_PREFIX + '/' + noteId,
    sendRequest,
    onUpdateError: updatingNoteOnServerFailed,
    onUpdateStarted: startUpdatingNoteOnServer,
    onUpdateSuccessful: updatingNoteOnServerSuccess,
    data: { text: newNoteText, noteId }
  }
);

export const updateServerNote = (updatedNoteText: string, noteId: Guid) =>
  putNoteFactory(prepareDependencies(updatedNoteText, noteId));
