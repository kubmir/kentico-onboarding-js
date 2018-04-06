import { API_PREFIX } from '../../constants/apiPrefix';
import { fetchFactory } from '../thunkFactories/fetchFactory';
import {
  IPutNoteDependencies,
  putNoteFactory
} from '../thunkFactories/putNoteFactory';

const sendRequest = fetchFactory(fetch);

const prepareDependencies = (): IPutNoteDependencies => (
  {
    apiPrefix: API_PREFIX,
    sendRequest,
  }
);

export const updateServerNote = (noteId: Guid, updatedNoteText: string) =>
  putNoteFactory(prepareDependencies())({ text: updatedNoteText, noteId });
