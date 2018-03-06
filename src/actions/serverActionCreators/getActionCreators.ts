import {
  getNotesFactory,
  IGetNotesDependencies
} from '../factories/getNotesFactory';
import {
  displayError,
  startLoadingNotes,
  storeLoadedNotes
} from '../notesLoaderActionCreators';
import { convertNotes } from '../../utils/noteConverter';
import { fetchFactory } from '../factories/fetchFactory';

const sendRequest = fetchFactory(fetch);

const configurationObject: IGetNotesDependencies = {
  apiAddress: process.env.API_URL,
  sendRequest,
  onGettingStarted: startLoadingNotes,
  onGettingError: displayError,
  onGettingSuccessful: storeLoadedNotes,
  convertNotes: convertNotes,
};

export const getAllNotes = getNotesFactory(configurationObject);
