import * as actionCreators from '../../src/actions/notesActionCreators';
import * as types from '../../src/constants/actionTypes';

describe('notesActionCreators', () => {
  let fakeNoteId;
  let isNotInEditMode;

  beforeEach(() => {
    fakeNoteId = 1;
    isNotInEditMode = false;
  });

  it('should create an action ADD_NEW_NOTE with correct text, isEditActive and generated id', () => {
    const noteText = 'New note add test';
    const generateId = () => {
      return fakeNoteId;
    };

    const expectedAction = {
      type: types.ADD_NEW_NOTE,
      payload: {
        text: noteText,
        isEditActive: isNotInEditMode,
        id: fakeNoteId,
      },
    };

    const returnedAction = actionCreators.addNewNote(noteText, generateId);

    expect(returnedAction).toEqual(expectedAction);
  });

  it('should create an action SAVE_UPDATED_NOTE with correct changes', () => {
    const textChanges = 'note changes';
    const expectedAction = {
      type: types.UPDATE_NOTE,
      payload: {
        text: textChanges,
        id: fakeNoteId,
        isEditActive: isNotInEditMode,
      },
    };

    const returnedAction = actionCreators.updateNote(textChanges, fakeNoteId);

    expect(returnedAction).toEqual(expectedAction);
  });

  it('should create an action DELETE_NOTE with correct id', () => {
    const expectedAction = {
      type: types.DELETE_NOTE,
      payload: {
        id: fakeNoteId,
      },
    };

    const returnedAction = actionCreators.deleteNote(fakeNoteId);

    expect(returnedAction).toEqual(expectedAction);
  });

  it('should create an action START_EDITING_NOTE with correct ID', () => {
    const expectedAction = {
      type: types.START_EDITING_NOTE,
      payload: {
        id: fakeNoteId,
      },
    };

    const returnedAction = actionCreators.startEditingNote(fakeNoteId);

    expect(returnedAction).toEqual(expectedAction);
  });

  it('should create an action CANCEL_EDITING_NOTE with correct ID', () => {
    const expectedAction = {
      type: types.CANCEL_EDITING_NOTE,
      payload: {
        id: fakeNoteId,
      },
    };

    const returnedAction = actionCreators.cancelEditingNote(fakeNoteId);

    expect(returnedAction).toEqual(expectedAction);
  });
});
