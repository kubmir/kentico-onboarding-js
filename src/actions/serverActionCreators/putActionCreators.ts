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

const prepareDependencies = (): IPutNoteDependencies => (
  {
    apiPrefix: API_PREFIX,
    sendRequest,
    onUpdateError: updatingNoteOnServerFailed,
    onUpdateStarted: startUpdatingNoteOnServer,
    onUpdateSuccessful: updatingNoteOnServerSuccess,
  }
);

export const updateServerNote = (updatedNoteText: string, noteId: Guid) =>
  putNoteFactory(prepareDependencies())({ text: updatedNoteText, noteId });
