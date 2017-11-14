import { Record } from 'immutable';

export const deepNoteEqual = (expectedNotePayload, actualNote) => {
  expect(actualNote).toBeInstanceOf(Record);
  expect(actualNote.text).toEqual(expectedNotePayload.text);
  expect(actualNote.id).toEqual(expectedNotePayload.id);
  expect(actualNote.isEditActive).toEqual(expectedNotePayload.isEditActive);
};
