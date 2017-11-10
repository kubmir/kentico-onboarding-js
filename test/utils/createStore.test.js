import { createApplicationStore } from '../../src/utils/createStore';
import { prepareApplicationInitialState, prepareListItem } from '../testUtils/prepareTestData';
import { OrderedMap } from 'immutable';

describe('Create store tests', () => {
  it('Create store with loaded state notes', () => {
    const expectedStoreStore = prepareApplicationInitialState();

    const actualStore = createApplicationStore(getSavedNotes, storeSavedData);
    const actualStoreState = actualStore.getState();

    expect(actualStoreState.notes).toEqual(expectedStoreStore.notes);
    expect(actualStoreState.addListMember).toEqual(expectedStoreStore.addListMember);
  });
});

const getSavedNotes = () => OrderedMap(
  [
    [1, prepareListItem('First test note', 1, false)],
    [2, prepareListItem('Second test note', 2, false)],
  ],
);

const storeSavedData = (dataToStore) => dataToStore;

