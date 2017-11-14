import { createApplicationStore } from '../../src/utils/createStore';
import {
  prepareApplicationInitialState,
  prepareListItem,
  prepareNotePayload,
} from '../testUtils/prepareTestData';
import { OrderedMap } from 'immutable';
import { deepNoteEqual } from '../testUtils/deepEquals';


describe('Create store tests', () => {
  it('Create store with loaded state notes', () => {
    const expectedStoreState = prepareApplicationInitialState();

    const actualStore = createApplicationStore(getSavedNotes, storeSavedData);
    const actualStoreState = actualStore.getState();

    expect(actualStoreState.listOfNotes).toEqual(expectedStoreState.listOfNotes);
    expect(actualStoreState.addListMember).toEqual(expectedStoreState.addListMember);
  });

  it('Save added notes to stored data', () => {
    const newNote = prepareNotePayload('New note', '10', false);
    const addNewNoteAction = {
      type: 'ADD_NEW_NOTE',
      payload: newNote,
    };

    const savedData = {
      key: '',
      notes: OrderedMap(),
    };

    const saveData = (key, dataToSave) => {
      savedData.key = key;
      savedData.notes = dataToSave;
    };


    const actualStore = createApplicationStore(getEmptySavedData, saveData);
    actualStore.dispatch(addNewNoteAction);

    const savedNote = savedData
      .notes
      .get('10');

    const savedKey = savedData
      .key;

    expect(savedKey).toEqual('notes');
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

