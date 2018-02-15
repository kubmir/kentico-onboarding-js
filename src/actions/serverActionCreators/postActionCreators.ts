import { fetchFactory } from '../factories/fetchFactory';
import {
  IPostNoteDependencies,
  postNoteFactory
} from '../factories/postNoteFactory';
import { API_PREFIX } from '../../constants/apiPrefix';
import {
  sendingNoteToServerFailed,
  sendingNoteToServerSuccess,
  startSendingNoteToServer
} from '../addNoteActionCreators';
import { convertNote } from '../../utils/noteConverter';
import { generateId } from '../../utils/generateId';
import { deleteNote } from '../notesActionCreators';

const sendRequest = fetchFactory(fetch);

const prepareDependencies = (newNoteText: string): IPostNoteDependencies => (
  {
    apiAddress: API_PREFIX,
    sendRequest,
    onAddingError: sendingNoteToServerFailed,
    onAddingStarted: startSendingNoteToServer,
    onAddingSuccessful: sendingNoteToServerSuccess,
    convertNote,
    data: { text: newNoteText },
    generateLocalId: generateId,
    deleteNote: deleteNote,
  }
);

export const addNewNote = (newNoteText: string) =>
  postNoteFactory(prepareDependencies(newNoteText));

