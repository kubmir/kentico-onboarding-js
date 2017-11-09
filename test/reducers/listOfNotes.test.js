import { listOfNotes } from '../../src/reducers/listOfNotes';
import {
  prepareInitialState,
  prepareActionWithUidPayload,
  prepareNoteRecord,
  prepareNotePayload,
} from './reducerTestUtils';

describe('Reducer listOfNotes tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = prepareInitialState();
  });

  it('should return previous state if unknown action is dispatched', () => {
    const unknownAction = {
      type: 'Test action',
      payload: {},
    };

    const actualState = listOfNotes(initialState, unknownAction);

    expect(actualState).toEqual(initialState);
  });

  it('should return previous state if action for another reducer is dispatched', () => {
    const addNoteAction = {
      type: 'START_FOCUS_ADD_LIST_MEMBER_INPUT',
      payload: {
        isAddListMemberTouched: true,
      },
    };

    const actualState = listOfNotes(initialState, addNoteAction);

    expect(actualState).toEqual(initialState);
  });

  it('should add new note to state listOfNotes when ADD_NEW_NOTE action is dispatched', () => {
    const newNotePayload = prepareNotePayload('Third test note - added', 3, false);

    const addNoteAction = {
      type: 'ADD_NEW_NOTE',
      payload: newNotePayload,
    };

    const actualState = listOfNotes(initialState, addNoteAction);
    const actualNote = actualState
      .notes
      .get(newNotePayload.id);

    expect(actualState.notes.size).toEqual(3);
    deepNoteEqual(newNotePayload, actualNote);
  });

  it('action UPDATE_NOTE should update note with specific id when dispatched', () => {
    const uidOfUpdatedNote = 1;
    const updateText = 'Updated text';
    const updatedNotePayload = prepareNotePayload(updateText, uidOfUpdatedNote, false);
    const updateAction = {
      type: 'UPDATE_NOTE',
      payload: updatedNotePayload,
    };

    const actualState = listOfNotes(initialState, updateAction);
    const actualNote = actualState
      .notes
      .get(uidOfUpdatedNote);

    expect(actualNote.isEditActive).toEqual(false);
    expect(actualNote.text).toEqual(updateText);
    expect(actualNote.id).toEqual(uidOfUpdatedNote);
    expect(actualState.notes.size).toEqual(2);
  });

  it('text of note should not be changed if no changes are made when UPDATE_NOTE is dispatched', () => {
    const idOfUpdatedNote = 1;
    const expectedNote = initialState
      .notes
      .get(idOfUpdatedNote);
    const updatedNotePayload = prepareNotePayload(expectedNote.text, idOfUpdatedNote, false);
    const updateAction = {
      type: 'UPDATE_NOTE',
      payload: {
        ...updatedNotePayload,
      },
    };

    const actualState = listOfNotes(initialState, updateAction);
    const actualNote = actualState
      .notes
      .get(idOfUpdatedNote);

    deepNoteEqual(updatedNotePayload, actualNote);
  });

  it('should delete note from state listOfNotes when DELETE_NOTE action is dispatched', () => {
    const deleteAction = prepareActionWithUidPayload('DELETE_NOTE', 1);

    const actualState = listOfNotes(initialState, deleteAction);

    expect(actualState.notes.size).toEqual(1);
    expect(actualState.notes.get(1)).toBe(undefined);
  });

  it('action DELETE_NOTE should not affect another listOfNotes', () => {
    const deleteAction = prepareActionWithUidPayload('DELETE_NOTE', 1);
    const notAffectedNote = prepareNoteRecord('Second test note', 2, false);

    const actualState = listOfNotes(initialState, deleteAction);

    expect(actualState.notes.get(2)).toEqual(notAffectedNote);
  });

  it('action START_EDITING_NOTE should start edit mode of defined note when dispatched', () => {
    const startEditAction = prepareActionWithUidPayload('START_EDITING_NOTE', 1);

    const actualState = listOfNotes(initialState, startEditAction);

    expect(actualState.notes.size).toEqual(2);
    expect(actualState.notes.get(1).isEditActive).toEqual(true);
  });

  it('action START_EDITING_NOTE should not affect another listOfNotes in state when dispatched', () => {
    const startEditAction = prepareActionWithUidPayload('START_EDITING_NOTE', 1);

    const actualState = listOfNotes(initialState, startEditAction);

    expect(actualState.notes.size).toEqual(2);
    expect(actualState.notes.get(2).isEditActive).toEqual(false);
  });

  it('action CANCEL_EDITING_NOTE should cancel edit mode of defined note when dispatched', () => {
    const state = {
      notes: initialState.notes.set(1, prepareNoteRecord('First test note', 1, true)),
    };
    const cancelEditAction = prepareActionWithUidPayload('CANCEL_EDITING_NOTE', 1);

    const actualState = listOfNotes(state, cancelEditAction);

    expect(actualState.notes.size).toEqual(2);
    expect(actualState.notes.get(1).isEditActive).toEqual(false);
    expect(actualState.notes.get(2).isEditActive).toEqual(false);
  });

  it('action CANCEL_EDITING_NOTE should have not effect on note not in edit mode when dispatched', () => {
    const cancelEditAction = prepareActionWithUidPayload('CANCEL_EDITING_NOTE', 1);

    const actualState = listOfNotes(initialState, cancelEditAction);

    expect(actualState.notes.size).toEqual(2);
    expect(actualState.notes.get(1).isEditActive).toEqual(false);
  });
});

const deepNoteEqual = (expectedNote, actualNote) => {
  expect(actualNote.text).toEqual(expectedNote.text);
  expect(actualNote.id).toEqual(expectedNote.id);
  expect(actualNote.isEditActive).toEqual(expectedNote.isEditActive);
};
