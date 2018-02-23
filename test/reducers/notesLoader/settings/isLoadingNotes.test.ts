import { isLoadingNotes } from '../../../../src/reducers/notesLoader/settings/isLoadingNotes';
import {
  displayError,
  startLoadingNotes,
  storeLoadedNotes
} from '../../../../src/actions/actionCreators';
import {
  FALSE_INITIAL_STATE,
  TRUE_INITIAL_STATE
} from '../../../testUtils/mocks';

describe('Reducer isLoadingNotes tests', () => {
  it('should return previous state if unknown action is dispatched', () => {
    const unknownAction = {
      type: 'Test action',
    };
    const expectedState = false;

    const actualState = isLoadingNotes(FALSE_INITIAL_STATE, unknownAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingNotes to false when LOADING_NOTES_FAILURE is dispatched', () => {
    const failedLoadingAction = displayError('Test error');
    const expectedState = false;

    const actualState = isLoadingNotes(TRUE_INITIAL_STATE, failedLoadingAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingNotes to false when LOADING_NOTES_SUCCESS is dispatched', () => {
    const successfulLoadingAction = storeLoadedNotes('{}');
    const expectedState = false;

    const actualState = isLoadingNotes(TRUE_INITIAL_STATE, successfulLoadingAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingNotes to true when START_LOADING_NOTES is dispatched', () => {
    const startLoadingAction = startLoadingNotes();
    const expectedState = true;

    const actualState = isLoadingNotes(FALSE_INITIAL_STATE, startLoadingAction);

    expect(actualState).toEqual(expectedState);
  });
});
