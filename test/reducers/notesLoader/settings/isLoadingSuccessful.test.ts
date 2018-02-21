import { isLoadingSuccessful } from '../../../../src/reducers/notesLoader/settings/isLoadingSuccessful';
import {
  displayError,
  startLoadingNotes,
  storeLoadedNotes
} from '../../../../src/actions/actionCreators';

describe('Reducer isLoadingSuccessful tests', () => {
  it('should return previous state if unknown action is dispatched', () => {
    const unknownAction = {
      type: 'Test action',
    };
    const expectedState = false;

    const actualState = isLoadingSuccessful(undefined, unknownAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingSuccessful to false when LOADING_NOTES_FAILURE is dispatched', () => {
    const failedLoadingAction = displayError('Test error');
    const expectedState = false;

    const actualState = isLoadingSuccessful(undefined, failedLoadingAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingSuccessful to true when LOADING_NOTES_SUCCESS is dispatched', () => {
    const successfulLoadingAction = storeLoadedNotes('{}');
    const expectedState = true;

    const actualState = isLoadingSuccessful(undefined, successfulLoadingAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingSuccessful to false when START_LOADING_NOTES is dispatched', () => {
    const startLoadingAction = startLoadingNotes();
    const expectedState = false;

    const actualState = isLoadingSuccessful(undefined, startLoadingAction);

    expect(actualState).toEqual(expectedState);
  });
});
