import { fetchFactory } from '../factories/fetchFactory';
import { postNoteFactory } from '../factories/postNoteFactory';
import { API_PREFIX } from '../../constants/apiPrefix';
import {
  sendingNoteToServerFailed,
  sendingNoteToServerSuccess,
  startSendingNoteToServer
} from '../addNoteActionCreators';
import { convertNote } from '../../utils/noteConverter';

const sendRequest = fetchFactory(fetch);

export const addNewNote = (newNoteText: string) =>
   postNoteFactory({
    apiAddress: API_PREFIX,
    sendRequest,
    onAddingError: sendingNoteToServerFailed,
    onAddingStarted: startSendingNoteToServer,
    onAddingSuccessful: sendingNoteToServerSuccess,
    convertNote,
    data: {text: newNoteText},
  });

