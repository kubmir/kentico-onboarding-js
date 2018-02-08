import { getNotesFactory } from '../factories/getNotes';
import { API_PREFIX } from '../../constants/apiPrefix';
import {
  displayError,
  startLoadingNotes,
  storeLoadedNotes
} from '../notesLoaderActionCreators';
import { convertNotes } from '../../utils/noteConverter';
import { fetchFactory } from '../factories/fetchFactory';

const sendRequest = fetchFactory(fetch);

const configurationObject = {
  sendRequest,
  onGettingStarted: startLoadingNotes,
  onGettingError: displayError,
  onGettingSuccessful: storeLoadedNotes,
  convertNotes: convertNotes,
};

export const getAllNotes = getNotesFactory({
  apiAddress: API_PREFIX,
  ...configurationObject,
});

export const getNoteWithId = (id: Guid) => getNotesFactory({
  apiAddress: API_PREFIX + '/' + id,
  ...configurationObject,
});
