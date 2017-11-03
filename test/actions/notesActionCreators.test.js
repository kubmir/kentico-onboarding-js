import * as actionCreators from '../../src/actions/notesActionCreators';
import * as types from '../../src/constants/actionTypes';

describe('notesActionCreators', () => {
  let fakeNoteUid;
  let isNotInEditMode;

  beforeEach(() => {
    fakeNoteUid = 1;
    isNotInEditMode = false;
  });

  it('should create an action ADD_NEW_NOTE with correct text, isEditActive and generated uid', () => {
    const noteText = 'New note add test';
    const generateUID = () => {
      return fakeNoteUid;
    };

    const expectedAction = {
      type: types.ADD_NEW_NOTE,
      payload: {
        text: noteText,
        isEditActive: isNotInEditMode,
        uid: fakeNoteUid,
      },
    };

    const returnedAction = actionCreators.addNewNote(noteText, generateUID);

    expect(returnedAction).toEqual(expectedAction);
  });

  it('should create an action SAVE_UPDATED_NOTE with correct changes', () => {
    const textChanges = 'note changes';
    const expectedAction = {
      type: types.UPDATE_NOTE,
      payload: {
        text: textChanges,
        uid: fakeNoteUid,
        isEditActive: isNotInEditMode,
      },
    };

    const returnedAction = actionCreators.updateNote(textChanges, fakeNoteUid);

    expect(returnedAction).toEqual(expectedAction);
  });

  it('should create an action DELETE_NOTE with correct uid', () => {
    const expectedAction = {
      type: types.DELETE_NOTE,
      payload: {
        uid: fakeNoteUid,
      },
    };

    const returnedAction = actionCreators.deleteNote(fakeNoteUid);

    expect(returnedAction).toEqual(expectedAction);
  });

  it('should create an action START_EDITING_NOTE with correct UID', () => {
    const expectedAction = {
      type: types.START_EDITING_NOTE,
      payload: {
        uid: fakeNoteUid,
      },
    };

    const returnedAction = actionCreators.startEditingNote(fakeNoteUid);

    expect(returnedAction).toEqual(expectedAction);
  });

  it('should create an action CANCEL_EDITING_NOTE with correct UID', () => {
    const expectedAction = {
      type: types.CANCEL_EDITING_NOTE,
      payload: {
        uid: fakeNoteUid,
      },
    };

    const returnedAction = actionCreators.cancelEditingNote(fakeNoteUid);

    expect(returnedAction).toEqual(expectedAction);
  });
});
