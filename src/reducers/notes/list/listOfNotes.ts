import { OrderedMap } from 'immutable';
import { Note } from '../../../models/Note';
import {
  CANCEL_EDITING_NOTE,
  DELETE_NOTE,
  DELETING_NOTE_FROM_SERVER_FAILURE,
  DELETING_NOTE_FROM_SERVER_SUCCESS,
  LOADING_NOTES_SUCCESS,
  SENDING_NOTE_TO_SERVER_FAILURE,
  SENDING_NOTE_TO_SERVER_SUCCESS,
  START_DELETING_NOTE_FROM_SERVER,
  START_EDITING_NOTE,
  START_SENDING_NOTE_TO_SERVER,
  UPDATE_NOTE,
} from '../../../constants/actionTypes';
import { IAction } from '../../../models/IAction';

const addNote = (state: OrderedMap<Guid, Note>, payload: { noteId: Guid, text: string, isCommunicating: boolean }): OrderedMap<Guid, Note> => {
  const { noteId, text, isCommunicating } = payload;
  const noteToAdd = new Note({
    id: noteId,
    text,
    isCommunicating,
  });

  return state
    .set(noteId, noteToAdd);
};

const updateText = (state: OrderedMap<Guid, Note>, payload: { noteId: Guid, text: string }): OrderedMap<Guid, Note> => {
  const { noteId, text } = payload;

  return state.update(noteId, note => note.with({
    text,
    isEditActive: false,
  }));
};

const deleteNote = (state: OrderedMap<Guid, Note>, payload: { noteId: Guid }): OrderedMap<Guid, Note> =>
  state.delete(payload.noteId);

const updateNote = (state: OrderedMap<Guid, Note>, updatedNote: Partial<Note>, noteId: Guid): OrderedMap<Guid, Note> =>
  state.update(noteId, note => note.with(updatedNote));

const addLoadedNotes = (payload: { notes: Iterable<[Guid, Note]> }): OrderedMap<Guid, Note> =>
  OrderedMap(payload.notes);

const updateServerCommunication = (state: OrderedMap<Guid, Note>, noteId: Guid, isCommunicating: boolean, communicationError: string) =>
  updateNote(
    state,
    {
      isEditActive: false,
      isCommunicating,
      communicationError
    },
    noteId
  );

export const listOfNotes = (state = OrderedMap<Guid, Note>(), action: IAction): OrderedMap<Guid, Note> => {
  switch (action.type) {
    case LOADING_NOTES_SUCCESS:
      return addLoadedNotes(action.payload);
    case START_SENDING_NOTE_TO_SERVER:
      return addNote(state, action.payload);
    case SENDING_NOTE_TO_SERVER_SUCCESS:
      return addNote(state, action.payload);
    case UPDATE_NOTE:
      return updateText(state, action.payload);
    case START_EDITING_NOTE:
      return updateNote(state, { isEditActive: true }, action.payload.noteId);
    case CANCEL_EDITING_NOTE:
      return updateNote(state, { isEditActive: false }, action.payload.noteId);
    case START_DELETING_NOTE_FROM_SERVER:
      return updateServerCommunication(state, action.payload.noteId, true, '');
    case DELETING_NOTE_FROM_SERVER_SUCCESS:
    case DELETE_NOTE:
      return deleteNote(state, action.payload);
    case SENDING_NOTE_TO_SERVER_FAILURE:
    case DELETING_NOTE_FROM_SERVER_FAILURE:
      return updateServerCommunication(state, action.payload.noteId, false, action.payload.errorDescription);
    default:
      return state;
  }
};
