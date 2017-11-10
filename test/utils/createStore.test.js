import { createApplicationStore } from '../../src/utils/createStore';
import {
  prepareApplicationInitialState,
  prepareListItem,
  prepareNotePayload
} from '../testUtils/prepareTestData';
import { OrderedMap } from 'immutable';
import { deepNoteEqual } from '../testUtils/deepEquals';


describe('Create store tests', () => {
  it('Create store with loaded state notes', () => {
    const expectedStoreStore = prepareApplicationInitialState();

    const actualStore = createApplicationStore(getSavedNotes, storeSavedData);
    const actualStoreState = actualStore.getState();

    expect(actualStoreState.notes).toEqual(expectedStoreStore.notes);
    expect(actualStoreState.addListMember).toEqual(expectedStoreStore.addListMember);
  });

  it('Save added notes to stored data', () => {
    const newNote = prepareNotePayload('New note', '10', false);
    const addNewNoteAction = {
      type: 'ADD_NEW_NOTE',
      payload: newNote,
    };

    let savedData = { notes: OrderedMap() };
    const saveData = (dataToSave) => {
      savedData = dataToSave;
    };


    const actualStore = createApplicationStore(getEmptySavedData, saveData);
    actualStore.dispatch(addNewNoteAction);
    const savedNote = savedData.notes.get('10');

    deepNoteEqual(newNote, savedNote);
  });
});

const getEmptySavedData = () => OrderedMap();

const getSavedNotes = () => OrderedMap(
  [
    [1, prepareListItem('First test note', 1, false)],
    [2, prepareListItem('Second test note', 2, false)],
  ],
);

const storeSavedData = (dataToStore) => dataToStore;

