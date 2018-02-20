import { OrderedMap } from 'immutable';
import { Note } from '../../src/models/Note';

export const prepareNote = (text: string, id: Guid, isEditActive: boolean): Note =>
  new Note({
    text,
    id,
    isEditActive,
  });

export const prepareLocalNote = (text: string, id: Guid): Note =>
  new Note({
    text,
    id,
    isCommunicating: true,
  });

export const prepareNoteWithCommunicationError = (text: string, id: Guid, communicationError: string, failedAction: Actions): Note =>
  new Note({
    text,
    id,
    communicationError,
    failedAction,
  });

export const prepareNotesInitialState = (): OrderedMap<Guid, Note> =>
  OrderedMap(
    [
      ['1', prepareNote('First test note', '1', false)],
      ['2', prepareNote('Second test note', '2', false)],
    ],
  );
