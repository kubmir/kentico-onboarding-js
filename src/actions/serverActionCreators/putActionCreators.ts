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
    apiPrefix: process.env.API_URL,
    sendRequest,
    onUpdateError: updatingNoteOnServerFailed,
    onUpdateStarted: startUpdatingNoteOnServer,
    onUpdateSuccessful: updatingNoteOnServerSuccess,
  }
);

export const updateServerNote = (updatedNoteText: string, noteId: Guid) =>
  putNoteFactory(prepareDependencies())({ text: updatedNoteText, noteId });
