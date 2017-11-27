import { generateId } from '../utils/generateId';
import { addNewNoteFactory } from './notesActionCreators';

export const addNewNote = addNewNoteFactory(generateId);
export * from './addListMemberActionCreators';
export * from './notesActionCreators';
