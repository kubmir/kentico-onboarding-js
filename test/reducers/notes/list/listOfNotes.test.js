import { listOfNotes } from '../../../../src/reducers/notes/list/listOfNotes.ts';
import {
  prepareNotesInitialState,
  prepareNote,
} from '../../../testUtils/prepareTestData';
import {
  sendingNoteToServerSuccess,
  deletingNoteFromServerSuccess,
  startEditingNote,
  updateNote,
  storeLoadedNotes,
  cancelEditingNote,
} from '../../../../src/actions/actionCreators.ts';
import { OrderedMap } from 'immutable';

describe('Reducer listOfNotes tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = prepareNotesInitialState();
  });

  it('Reducer should return previous state if unknown action is dispatched', () => {
    const unknownAction = {
      type: 'Test action',
    };

    const actualState = listOfNotes(initialState, unknownAction);

    expect(actualState).toEqual(initialState);
  });

  it('action LOADING_NOTE_SUCCESS should add all loaded notes to stete notes', () => {
    const loadedNotes = OrderedMap([
      ['1', prepareNote('First test note', '1', false)],
      ['2', prepareNote('Second test note', '2', false)],
    ]);
    const loadingSuccessAction = storeLoadedNotes(loadedNotes);
    const expectedState = loadedNotes;

    const actualState = listOfNotes(initialState, loadingSuccessAction);

    expect(actualState).toEqual(expectedState);
  });

  it('action SENDING_NOTE_TO_SERVER_SUCCESS should add new note to state notes', () => {
    const noteToAddText = 'Third test note - added';
    const newNote = prepareNote(noteToAddText, '3', false);
    const addNoteAction = sendingNoteToServerSuccess(newNote);
    const expectedState = OrderedMap(
      [
        ['1', prepareNote('First test note', '1', false)],
        ['2', prepareNote('Second test note', '2', false)],
        ['3', newNote],
      ],
    );

    const actualState = listOfNotes(initialState, addNoteAction);

    expect(actualState).toEqual(expectedState);
  });

  it('action UPDATE_NOTE should update note with specific noteId', () => {
    const idOfUpdatedNote = '1';
    const textChanges = 'Updated text';
    const updateAction = updateNote(textChanges, idOfUpdatedNote);
    const expectedState = OrderedMap(
      [
        ['1', prepareNote(textChanges, '1', false)],
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );

    const actualState = listOfNotes(initialState, updateAction);

    expect(actualState).toEqual(expectedState);
  });

  it('action UPDATE_NOTE should not change text of note if no changes are made', () => {
    const idOfUpdatedNote = '1';
    const previousNote = initialState
      .get(idOfUpdatedNote);
    const expectedState = prepareNotesInitialState();
    const updateAction = updateNote(previousNote.text, idOfUpdatedNote);

    const actualState = listOfNotes(initialState, updateAction);

    expect(actualState).toEqual(expectedState);
  });

  it('action DELETING_NOTE_FROM_SERVER_SUCCESS should delete note from state notes', () => {
    const deleteAction = deletingNoteFromServerSuccess('1');
    const expectedState = OrderedMap(
      [
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );

    const actualState = listOfNotes(initialState, deleteAction);

    expect(actualState).toEqual(expectedState);
  });

  it('action START_EDITING_NOTE should start edit mode of defined note', () => {
    const idOfNote = '1';
    const startEditAction = startEditingNote(idOfNote);
    const expectedState = OrderedMap(
      [
        ['1', prepareNote('First test note', '1', true)],
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );

    const actualState = listOfNotes(initialState, startEditAction);

    expect(actualState).toEqual(expectedState);
  });

  it('action CANCEL_EDITING_NOTE should cancel edit mode of defined note', () => {
    const idOfNote = '1';
    const startEditAction = cancelEditingNote(idOfNote);
    const expectedState = OrderedMap(
      [
        ['1', prepareNote('First test note', '1', false)],
        ['2', prepareNote('Second test note', '2', true)],
      ],
    );
    initialState = OrderedMap(
      [
        ['1', prepareNote('First test note', '1', true)],
        ['2', prepareNote('Second test note', '2', true)],
      ],
    );

    const actualState = listOfNotes(initialState, startEditAction);

    expect(actualState).toEqual(expectedState);
  });
});
