import { isLoadingFailed } from '../../../../src/reducers/notesLoader/settings/isLoadingFailed';
import {
  FALSE_INITIAL_STATE,
  TRUE_INITIAL_STATE
} from '../../../testUtils/mocks';
import {
  displayError,
  startLoadingNotes,
  storeLoadedNotes
} from '../../../../src/actions/thunkFactories/getNotesFactory';

describe('Reducer isLoadingFailed ', () => {
  it('should working correctly with undefined state.', () => {
    const displayErrorAction = displayError('Test error');
    const expectedState = true;

    const actualState = isLoadingFailed(undefined, displayErrorAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should return previous state if unknown action is dispatched.', () => {
    const unknownAction = {
      type: 'Test action',
    };
    const expectedState = false;

    const actualState = isLoadingFailed(FALSE_INITIAL_STATE, unknownAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingFailed to true when LOADING_NOTES_FAILURE is dispatched.', () => {
    const failedLoadingAction = displayError('Test error');
    const expectedState = true;

    const actualState = isLoadingFailed(FALSE_INITIAL_STATE, failedLoadingAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingFailed to false when LOADING_NOTES_SUCCESS is dispatched.', () => {
    const successfulLoadingAction = storeLoadedNotes('{}');
    const expectedState = false;

    const actualState = isLoadingFailed(TRUE_INITIAL_STATE, successfulLoadingAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingFailed to false when START_LOADING_NOTES is dispatched.', () => {
    const startLoadingAction = startLoadingNotes();
    const expectedState = false;

    const actualState = isLoadingFailed(TRUE_INITIAL_STATE, startLoadingAction);

    expect(actualState).toEqual(expectedState);
  });
});
