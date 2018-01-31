import { isLoadingNotes } from '../../../../src/reducers/notesLoader/settings/isLoadingNotes';
import {
  displayError,
  startLoadingNotes,
  storeLoadedNotes
} from '../../../../src/actions/notesLoaderActionCreators';

describe('Reducer isLoadingNotes tests', () => {
  it('should return previous state if unknown action is dispatched', () => {
    const unknownAction = {
      type: 'Test action',
    };
    const expectedState = false;

    const actualState = isLoadingNotes(undefined, unknownAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingNotes to false when LOADING_NOTES_FAILURE is dispatched', () => {
    const failedLoadingAction = displayError('Test error');
    const expectedState = false;

    const actualState = isLoadingNotes(undefined, failedLoadingAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingNotes to false when LOADING_NOTES_SUCCESS is dispatched', () => {
    const successfulLoadingAction = storeLoadedNotes('{}');
    const expectedState = false;

    const actualState = isLoadingNotes(undefined, successfulLoadingAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isLoadingNotes to true when START_LOADING_NOTES is dispatched', () => {
    const startLoadingAction = startLoadingNotes();
    const expectedState = true;

    const actualState = isLoadingNotes(undefined, startLoadingAction);

    expect(actualState).toEqual(expectedState);
  });
});
