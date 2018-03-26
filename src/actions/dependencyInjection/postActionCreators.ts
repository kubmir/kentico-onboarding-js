import { fetchFactory } from '../thunkFactories/fetchFactory';
import {
  IPostDependencies,
  IPostNoteDependencies,
  IRepostNoteDependencies,
  postNoteFactory,
  repostNoteFactory
} from '../thunkFactories/postNoteFactory';
import { API_PREFIX } from '../../constants/apiPrefix';
import {
  sendingNoteToServerFailed,
  sendingNoteToServerSuccess,
  startReSendingNoteToServer,
  startSendingNoteToServer
} from '../simpleActionCreators/addNoteActionCreators';
import { convertNote } from '../../utils/noteConverter';
import { generateId } from '../../utils/generateId';

const sendRequest = fetchFactory(fetch);

const preparePostDependencies = (): IPostDependencies => ({
  apiAddress: API_PREFIX,
  sendRequest,
  onAddingError: sendingNoteToServerFailed,
  onAddingSuccessful: sendingNoteToServerSuccess,
  convertNote,
});

const preparePostNoteDependencies = (): IPostNoteDependencies => (
  {
    ...preparePostDependencies(),
    onAddingStarted: startSendingNoteToServer,
    generateLocalId: generateId,
  }
);

const prepareRePostNoteDependencies = (): IRepostNoteDependencies => (
  {
    ...preparePostDependencies(),
    onAddingStarted: startReSendingNoteToServer,
  }
);

export const addNewNote = (newNoteText: string) =>
  postNoteFactory(preparePostNoteDependencies())({ text: newNoteText });

export const retryAddNewNote = (newNoteText: string, localId: Guid) =>
  repostNoteFactory(prepareRePostNoteDependencies())({ text: newNoteText }, localId);
