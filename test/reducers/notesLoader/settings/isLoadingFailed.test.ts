import { isLoadingFailed } from '../../../../src/reducers/notesLoader/settings/isLoadingFailed';
import {
  displayError,
  startLoadingNotes,
  storeLoadedNotes
} from '../../../../src/actions/notesLoaderActionCreators';

describe('Reducer isLoadingFailed tests', () => {
  it('should return previous state if unknown action is dispatched', () => {
    const unknownAction = {
      type: 'Test action',
    };
    const expectedState = false;

    const actualState = isLoadingFailed(undefined, unknownAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingFailed to true when LOADING_NOTES_FAILURE is dispatched', () => {
    const failedLoadingAction = displayError('Test error');
    const expectedState = true;

    const actualState = isLoadingFailed(undefined, failedLoadingAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingFailed to false when LOADING_NOTES_SUCCESS is dispatched', () => {
    const successfulLoadingAction = storeLoadedNotes('{}');
    const expectedState = false;

    const actualState = isLoadingFailed(undefined, successfulLoadingAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingFailed to false when START_LOADING_NOTES is dispatched', () => {
    const startLoadingAction = startLoadingNotes();
    const expectedState = false;

    const actualState = isLoadingFailed(undefined, startLoadingAction);

    expect(actualState).toEqual(expectedState);
  });
});
