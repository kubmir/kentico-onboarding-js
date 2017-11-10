export const deepNoteEqual = (expectedNote, actualNote) => {
  expect(actualNote.text).toEqual(expectedNote.text);
  expect(actualNote.id).toEqual(expectedNote.id);
  expect(actualNote.isEditActive).toEqual(expectedNote.isEditActive);
};
