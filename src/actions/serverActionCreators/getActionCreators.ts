import {
  getNotesFactory,
  IGetNotesDependencies
} from '../factories/getNotesFactory';
import { API_PREFIX } from '../../constants/apiPrefix';
import {
  displayError,
  startLoadingNotes,
  storeLoadedNotes
} from '../notesLoaderActionCreators';
import { convertNotes } from '../../utils/noteConverter';
import { fetchFactory } from '../factories/fetchFactory';

const sendRequest = fetchFactory(fetch);

const configurationObject: IGetNotesDependencies = {
  apiAddress: API_PREFIX,
  sendRequest,
  onGettingStarted: startLoadingNotes,
  onGettingError: displayError,
  onGettingSuccessful: storeLoadedNotes,
  convertNotes: convertNotes,
};

export const getAllNotes = getNotesFactory(configurationObject);
