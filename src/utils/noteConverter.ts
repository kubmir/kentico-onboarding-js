import { IServerNote } from '../models/IServerNote';
import { INote } from '../models/Note';

export const convertNote = ({ id, text }: IServerNote): INote => ({
  text,
  id,
  isEditActive: false,
});

export const convertNotes = (serverNotes: IServerNote[]): Iterable<INote> =>
  serverNotes.map(serverNote => convertNote(serverNote));
