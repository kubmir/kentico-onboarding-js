import { notes } from '../../src/reducers/notesList';
import {
  prepareInitialState,
  prepareActionWithUidPayload,
  prepareNoteObject,
} from './reducerTestUtils';

describe('Reducer notesList tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = prepareInitialState();
  });

  it('should return previous state if unknown action is dispatched', () => {
    const unknownAction = {
      type: 'Test action',
      payload: {},
    };

    const actualState = notes(initialState, unknownAction);

    expect(actualState).toEqual(initialState);
  });

  it('should return previous state if action for another reducer is dispatched', () => {
    const addNoteAction = {
      type: 'START_TOUCH_ADD_LIST_MEMBER_INPUT',
      payload: {
        isAddListMemberTouched: true,
      },
    };

    const actualState = notes(initialState, addNoteAction);

    expect(actualState).toEqual(initialState);
  });

  it('should add new note to state notes when ADD_NEW_NOTE action is dispatched', () => {
    const newNote = prepareNoteObject('Third test note - added', 3, false);

    const addNoteAction = {
      type: 'ADD_NEW_NOTE',
      payload: newNote,
    };

    const actualState = notes(initialState, addNoteAction);
    const actualNote = actualState
      .notes
      .get(newNote.uid);

    expect(actualState.notes.size).toEqual(3);
    expect(actualNote).toEqual(newNote);
  });

  it('action UPDATE_NOTE should update note with specific uid when dispatched', () => {
    const uidOfUpdatedNote = 1;
    const updateText = 'Updated text';
    const updatedNote = prepareNoteObject(updateText, uidOfUpdatedNote, false);
    const updateAction = {
      type: 'UPDATE_NOTE',
      payload: updatedNote,
    };

    const actualState = notes(initialState, updateAction);
    const actualNote = actualState
      .notes
      .get(uidOfUpdatedNote);

    expect(actualNote.isEditActive).toEqual(false);
    expect(actualNote.text).toEqual(updateText);
    expect(actualNote.uid).toEqual(uidOfUpdatedNote);
    expect(actualState.notes.size).toEqual(2);
  });

  it('text of note should not be changed if no changes are made when UPDATE_NOTE is dispatched', () => {
    const uidOfUpdatedNote = 1;
    const expectedNote = initialState
      .notes
      .get(uidOfUpdatedNote);
    const updatedNote = prepareNoteObject(expectedNote.text, uidOfUpdatedNote, false);
    const updateAction = {
      type: 'UPDATE_NOTE',
      payload: updatedNote,
    };

    const actualState = notes(initialState, updateAction);
    const actualNote = actualState
      .notes
      .get(uidOfUpdatedNote);

    expect(actualNote).toEqual(expectedNote);
  });

  it('should delete note from state notes when DELETE_NOTE action is dispatched', () => {
    const deleteAction = prepareActionWithUidPayload('DELETE_NOTE', 1);

    const actualState = notes(initialState, deleteAction);

    expect(actualState.notes.size).toEqual(1);
    expect(actualState.notes.get(1)).toBe(undefined);
  });

  it('action DELETE_NOTE should not affect another notes', () => {
    const deleteAction = prepareActionWithUidPayload('DELETE_NOTE', 1);
    const notAffectedNote = prepareNoteObject('Second test note', 2, false);

    const actualState = notes(initialState, deleteAction);

    expect(actualState.notes.get(2)).toEqual(notAffectedNote);
  });

  it('action START_EDITING_NOTE should start edit mode of defined note when dispatched', () => {
    const startEditAction = prepareActionWithUidPayload('START_EDITING_NOTE', 1);

    const actualState = notes(initialState, startEditAction);

    expect(actualState.notes.size).toEqual(2);
    expect(actualState.notes.get(1).isEditActive).toEqual(true);
  });

  it('action START_EDITING_NOTE should not affect another notes in state when dispatched', () => {
    const startEditAction = prepareActionWithUidPayload('START_EDITING_NOTE', 1);

    const actualState = notes(initialState, startEditAction);

    expect(actualState.notes.size).toEqual(2);
    expect(actualState.notes.get(2).isEditActive).toEqual(false);
  });

  it('action CANCEL_EDITING_NOTE should cancel edit mode of defined note when dispatched', () => {
    const state = {
      notes: initialState.notes.set(1, prepareNoteObject('First test note', 1, true)),
    };
    const cancelEditAction = prepareActionWithUidPayload('CANCEL_EDITING_NOTE', 1);

    const actualState = notes(state, cancelEditAction);

    expect(actualState.notes.size).toEqual(2);
    expect(actualState.notes.get(1).isEditActive).toEqual(false);
    expect(actualState.notes.get(2).isEditActive).toEqual(false);
  });

  it('action CANCEL_EDITING_NOTE should have not effect on note not in edit mode when dispatched', () => {
    const cancelEditAction = prepareActionWithUidPayload('CANCEL_EDITING_NOTE', 1);

    const actualState = notes(initialState, cancelEditAction);

    expect(actualState.notes.size).toEqual(2);
    expect(actualState.notes.get(1).isEditActive).toEqual(false);
  });
});
