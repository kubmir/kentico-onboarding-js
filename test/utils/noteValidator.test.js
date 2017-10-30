import isNoteValid from '../../src/utils/noteValidator';

describe('Note validator tests', () => {
  it('returns true for valid note', () => {
    const validNote = 'Valid Note';

    const validationResult = isNoteValid(validNote);

    expect(validationResult).toBeTruthy();
  });

  it('returns false for empty note', () => {
    const invalidNote = '';

    const validationResult = isNoteValid(invalidNote);

    expect(validationResult).toBeFalsy();
  });
});
