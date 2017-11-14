import { listOfNotes } from '../../src/reducers/listOfNotes';
import {
  prepareNotesInitialState,
  prepareActionWithUidPayload,
  prepareListItem,
  prepareNotePayload,
} from '../testUtils/prepareTestData';
import { deepNoteEqual } from '../testUtils/deepEquals';

describe('Reducer listOfNotes tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = prepareNotesInitialState();
  });

  it('Reducer should return previous state if unknown action is dispatched', () => {
    const unknownAction = {
      type: 'Test action',
      payload: {},
    };

    const actualState = listOfNotes(initialState, unknownAction);

    expect(actualState).toEqual(initialState);
  });

  it('Reducer should return previous state if action for another reducer is dispatched', () => {
    const addNoteAction = {
      type: 'START_FOCUS_ADD_LIST_MEMBER_INPUT',
      payload: {
        isAddListMemberFocused: true,
      },
    };

    const actualState = listOfNotes(initialState, addNoteAction);

    expect(actualState).toEqual(initialState);
  });

  it('action ADD_NEW_NOTE should add new note to state notes', () => {
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

  it('action UPDATE_NOTE should update note with specific id', () => {
    const uidOfUpdatedNote = 1;
    const updatedNotePayload = prepareNotePayload('Updated text', uidOfUpdatedNote, false);
    const updateAction = {
      type: 'UPDATE_NOTE',
      payload: updatedNotePayload,
    };

    const actualState = listOfNotes(initialState, updateAction);
    const actualNote = actualState
      .notes
      .get(uidOfUpdatedNote);

    expect(actualState.notes.size).toEqual(2);
    deepNoteEqual(updatedNotePayload, actualNote);
  });

  it('action UPDATE_NOTE should not change text of note if no changes are made', () => {
    const idOfUpdatedNote = 1;
    const previousNote = initialState
      .notes
      .get(idOfUpdatedNote);

    const updatedNotePayload = prepareNotePayload(previousNote.text, idOfUpdatedNote, false);
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

  it('action DELETE_NOTE should delete note from state notes', () => {
    const deleteAction = prepareActionWithUidPayload('DELETE_NOTE', 1);

    const actualState = listOfNotes(initialState, deleteAction);

    expect(actualState.notes.size).toEqual(1);
    expect(actualState.notes.get(1)).not.toBeDefined();
  });

  it('action DELETE_NOTE should not affect another notes', () => {
    const deleteAction = prepareActionWithUidPayload('DELETE_NOTE', 1);
    const notAffectedNote = prepareListItem('Second test note', 2, false);

    const actualState = listOfNotes(initialState, deleteAction);

    expect(actualState.notes.get(2)).toEqual(notAffectedNote);
  });

  it('action START_EDITING_NOTE should start edit mode of defined note', () => {
    const idOfNote = 1;
    const startEditAction = prepareActionWithUidPayload('START_EDITING_NOTE', idOfNote);

    const actualState = listOfNotes(initialState, startEditAction);
    const updatedNote = actualState.notes.get(idOfNote);

    expect(actualState.notes.size).toEqual(2);
    expect(updatedNote.isEditActive).toBeTruthy();
  });

  it('action START_EDITING_NOTE should not affect another notes in state', () => {
    const startEditAction = prepareActionWithUidPayload('START_EDITING_NOTE', 1);

    const actualState = listOfNotes(initialState, startEditAction);

    expect(actualState.notes.size).toEqual(2);
    expect(actualState.notes.get(2).isEditActive).toBeFalsy();
  });

  it('action CANCEL_EDITING_NOTE should cancel edit mode of defined note', () => {
    const idOfNote = 1;
    const state = {
      notes: initialState.notes.set(idOfNote, prepareListItem('First test note', idOfNote, true)),
    };
    const cancelEditAction = prepareActionWithUidPayload('CANCEL_EDITING_NOTE', idOfNote);

    const actualState = listOfNotes(state, cancelEditAction);
    const updatedNote = actualState.notes.get(idOfNote);

    expect(actualState.notes.size).toEqual(2);
    expect(updatedNote.isEditActive).toBeFalsy();
  });

  it('action CANCEL_EDITING_NOTE should have not effect on note not in edit mode', () => {
    const idOfNote = 1;
    const cancelEditAction = prepareActionWithUidPayload('CANCEL_EDITING_NOTE', idOfNote);

    const actualState = listOfNotes(initialState, cancelEditAction);
    const updatedNote = actualState.notes.get(idOfNote);

    expect(actualState.notes.size).toEqual(2);
    expect(updatedNote.isEditActive).toBeFalsy();
  });
});
