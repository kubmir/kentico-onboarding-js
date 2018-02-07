import { IServerNote } from '../models/IServerNote';
import { Note } from '../models/Note';

export const convertNote = ({ id, text }: IServerNote): Note => (
  new Note({
    text,
    id,
    isEditActive: false,
  })
);

export const convertNotes = (serverNotes: IServerNote[]): Iterable<[Guid, Note]> =>
  serverNotes.map(serverNote => [serverNote.id, convertNote(serverNote)]);
