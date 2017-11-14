import {
  prepareNotesForStoring,
  prepareNotesForApplication,
} from '../../src/utils/localStorageUtils';
import {
  mockNotesForStoring,
  mockNotesForApplication,
  prepareNotesInitialState,
} from '../testUtils/prepareTestData';

describe('localStorageUtils tests', () => {
  it('prepareNotesForStoring', () => {
    const expectedNotes = mockNotesForStoring();
    const notesForStoring = prepareNotesInitialState()
      .notes;

    const preparedNotes = prepareNotesForStoring(notesForStoring);
    const stringifiedPreparedNotes = JSON.stringify(preparedNotes);

    expect(stringifiedPreparedNotes).toEqual(expectedNotes);
  });

  it('prepareNotesForApplication tests', () => {
    const expectedNotes = mockNotesForApplication();
    const notesFromStorage = mockNotesForStoring();
    const parsedStorageNotes = JSON.parse(notesFromStorage);

    const preparedNotes = prepareNotesForApplication(parsedStorageNotes);

    expect(preparedNotes).toEqual(expectedNotes);
  });
});
