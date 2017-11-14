import * as actionCreators from '../../src/actions/notesActionCreators';
import * as types from '../../src/constants/actionTypes';
import {
  prepareActionWithUidPayload,
  prepareActionWithPayload,
} from '../testUtils/prepareTestData';

describe('notesActionCreators tests', () => {
  let fakeNoteId;
  let isNotInEditMode;

  beforeEach(() => {
    fakeNoteId = 1;
    isNotInEditMode = false;
  });

  it('addNewNote - should create an action ADD_NEW_NOTE with correct payload', () => {
    const noteText = 'New note add test';
    const generateId = () => fakeNoteId;
    const expectedAction = prepareActionWithPayload(types.ADD_NEW_NOTE, fakeNoteId, noteText, isNotInEditMode);

    const actualAction = actionCreators.addNewNote(noteText, generateId);

    expect(actualAction).toEqual(expectedAction);
  });

  it('updateNote - should create an action SAVE_UPDATED_NOTE with correct changes', () => {
    const textChanges = 'note changes';
    const expectedAction = prepareActionWithPayload(types.UPDATE_NOTE, fakeNoteId, textChanges, isNotInEditMode);

    const actualAction = actionCreators.updateNote(textChanges, fakeNoteId);

    expect(actualAction).toEqual(expectedAction);
  });

  it('deleteNote - should create an action DELETE_NOTE with correct ID', () => {
    const expectedAction = prepareActionWithUidPayload(types.DELETE_NOTE, fakeNoteId);

    const actualAction = actionCreators.deleteNote(fakeNoteId);

    expect(actualAction).toEqual(expectedAction);
  });

  it('startEditingNote - should create an action START_EDITING_NOTE with correct ID', () => {
    const expectedAction = prepareActionWithUidPayload(types.START_EDITING_NOTE, fakeNoteId);

    const actualAction = actionCreators.startEditingNote(fakeNoteId);

    expect(actualAction).toEqual(expectedAction);
  });

  it('cancelEditingNote - should create an action CANCEL_EDITING_NOTE with correct ID', () => {
    const expectedAction = prepareActionWithUidPayload(types.CANCEL_EDITING_NOTE, fakeNoteId);

    const actualAction = actionCreators.cancelEditingNote(fakeNoteId);

    expect(actualAction).toEqual(expectedAction);
  });
});
