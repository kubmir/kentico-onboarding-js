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

export const prepareNoteWithCommunicationError = (text: string, id: Guid, communicationError: string): Note =>
  new Note({
    text,
    id,
    communicationError,
  });

export const prepareNotesInitialState = (): OrderedMap<Guid, Note> =>
  OrderedMap(
    [
      ['1', prepareNote('First test note', '1', false)],
      ['2', prepareNote('Second test note', '2', false)],
    ],
  );

export const mockNotesForStoring = () =>
  JSON.stringify([
    {
      text: 'First test note',
      noteId: '1',
    },
    {
      text: 'Second test note',
      noteId: '2',
    },
  ]);

export const mockNotesForApplication = () =>
  [
    [
      '1',
      new Note({
        text: 'First test note',
        id: '1',
        isEditActive: false,
      }),
    ],
    [
      '2',
      new Note({
        text: 'Second test note',
        id: '2',
        isEditActive: false,
      }),
    ],
  ];
