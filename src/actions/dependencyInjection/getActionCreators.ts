import {
  getNotesFactory,
  IGetNotesDependencies
} from '../thunkFactories/getNotesFactory';
import { API_PREFIX } from '../../constants/apiPrefix';
import { convertNotes } from '../../utils/noteConverter';
import { fetchFactory } from '../thunkFactories/fetchFactory';

const sendRequest = fetchFactory(fetch);

const configurationObject: IGetNotesDependencies = {
  apiAddress: API_PREFIX,
  sendRequest,
  convertNotes: convertNotes,
};

export const getAllNotes = () => getNotesFactory(configurationObject);
