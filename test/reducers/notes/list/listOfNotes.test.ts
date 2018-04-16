import { OrderedMap } from 'immutable';
import { listOfNotes } from '../../../../src/reducers/notes/list/listOfNotes';
import {
  prepareNotesInitialState,
  prepareNote,
  prepareLocalNote,
  prepareNoteWithCommunicationError,
} from '../../../testUtils/prepareTestData';
import {
  startEditingNote,
  cancelEditingNote,
  cancelFailedDeleteAction,
  cancelFailedAddAction,
  cancelFailedUpdateAction,
} from '../../../../src/actions';
import {
  sendingNoteToServerSuccess,
  startReSendingNoteToServer,
  startSendingNoteToServer,
  sendingNoteFailedFactory,
} from '../../../../src/actions/thunkFactories/postNoteFactory';
import { Note } from '../../../../src/models/Note';
import {
  deletingNoteFromServerSuccess,
  startDeletingNoteFromServer,
  deleteFailureFactory,
} from '../../../../src/actions/thunkFactories/deleteNoteFactory';
import { storeLoadedNotes } from '../../../../src/actions/thunkFactories/getNotesFactory';
import {
  startUpdatingNoteOnServer,
  updatingNoteOnServerSuccess,
  updateFailedFactory,
} from '../../../../src/actions/thunkFactories/putNoteFactory';

describe('Reducer listOfNotes ', () => {
  let initialState: OrderedMap<Guid, Note>;

  beforeEach(() => {
    initialState = prepareNotesInitialState();
  });

  it('should working correctly with undefined state.', () => {
    const loadAction = storeLoadedNotes(initialState);

    const actualState = listOfNotes(undefined, loadAction);

    expect(actualState).toEqual(initialState);
  });

  it('should return previous state if unknown action is dispatched.', () => {
    const unknownAction = {
      type: 'Test action',
    };

    const actualState = listOfNotes(initialState, unknownAction);

    expect(actualState).toEqual(initialState);
  });

  it('should add all loaded notes to state notes when action LOADING_NOTE_SUCCESS is dispatched.', () => {
    const loadingSuccessAction = storeLoadedNotes(initialState);
    const expectedState = initialState;

    const actualState = listOfNotes(OrderedMap(), loadingSuccessAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should add new note to state notes when action START_SENDING_NOTE_TO_SERVER is dispatched.', () => {
    const noteToAddText = 'Third local test note - added - isCommunicating';
    const noteToAddId = '3';
    const newNote = prepareLocalNote(noteToAddText, noteToAddId);
    const addNoteAction = startSendingNoteToServer(noteToAddId, noteToAddText);
    const expectedState = OrderedMap([
        ['1', prepareNote('First test note', '1', false)],
        ['2', prepareNote('Second test note', '2', false)],
        ['3', newNote],
      ],
    );

    const actualState = listOfNotes(initialState, addNoteAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should update isCommunicating and errorDescription of state note when action START_RESENDING_NOTE_TO_SERVER is dispatched.', () => {
    const resendingAction = startReSendingNoteToServer('2');
    const expectedState = OrderedMap([
      ['1', prepareNote('First test note', '1', false)],
      ['2', prepareLocalNote('Second test note', '2')],
    ]);

    const actualState = listOfNotes(initialState, resendingAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should add new note to state notes when action SENDING_NOTE_TO_SERVER_SUCCESS is dispatched.', () => {
    const noteToAddText = 'Third test note - added';
    const newNote = prepareNote(noteToAddText, '3', false);
    const addNoteAction = sendingNoteToServerSuccess(newNote, '2');
    const expectedState = OrderedMap([
        ['1', prepareNote('First test note', '1', false)],
        ['3', newNote.with({ serverSynchronizedText: noteToAddText })],
    ]);

    const actualState = listOfNotes(initialState, addNoteAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should update note with specific noteId when action UPDATING_NOTE_ON_SERVER_SUCCESS is dispatched.', () => {
    const idOfUpdatedNote = '1';
    const textChanges = 'Updated visibleText';
    const updateAction = updatingNoteOnServerSuccess(new Note({ visibleText: textChanges, id: idOfUpdatedNote }));
    const expectedState = OrderedMap(
      [
        ['1', prepareNote(textChanges, idOfUpdatedNote, false).with({ serverSynchronizedText: textChanges })],
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );

    const actualState = listOfNotes(initialState, updateAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should not change visibleText of note if no changes are made when action UPDATING_NOTE_ON_SERVER_SUCCESS is dispatched.', () => {
    const idOfUpdatedNote = '1';
    const previousNote = initialState
      .get(idOfUpdatedNote);
    const expectedState =   OrderedMap([
        ['1', prepareNote('First test note', idOfUpdatedNote, false).with( { serverSynchronizedText: 'First test note' })],
        ['2', prepareNote('Second test note', '2', false)],
    ]);
    const updateAction = updatingNoteOnServerSuccess(new Note({ visibleText: previousNote.visibleText, id: idOfUpdatedNote }));

    const actualState = listOfNotes(initialState, updateAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should delete note from state notes when action DELETING_NOTE_FROM_SERVER_SUCCESS is dispatched.', () => {
    const deleteAction = deletingNoteFromServerSuccess('1');
    const expectedState = OrderedMap(
      [
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );

    const actualState = listOfNotes(initialState, deleteAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should start edit mode of defined note when action START_EDITING_NOTE is dispatched.', () => {
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

  it('should cancel edit mode of defined note when action CANCEL_EDITING_NOTE is dispatched.', () => {
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

  it('should set property isCommunicating of note to true when action START_DELETING_NOTE_FROM_SERVER is dispatched.', () => {
    const startDeleteAction = startDeletingNoteFromServer('2');
    const expectedState = OrderedMap(
      [
        ['1', prepareNote('First test note', '1', false)],
        ['2', prepareLocalNote('Second test note', '2')],
      ],
    );

    const actualState = listOfNotes(initialState, startDeleteAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set property isCommunicating of note to true when action START_UPDATING_NOTE_ON_SERVER is dispatched.', () => {
    const startDeleteAction = startUpdatingNoteOnServer('2', 'new test visibleText');
    const expectedState = OrderedMap(
      [
        ['1', prepareNote('First test note', '1', false)],
        ['2', prepareLocalNote('new test visibleText', '2')],
      ],
    );

    const actualState = listOfNotes(initialState, startDeleteAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set property errorId of note when action DELETING_NOTE_FROM_SERVER_FAILURE is dispatched.', () => {
    const deletingNoteFailureAction = deleteFailureFactory(() => 'error1')('1', 'Test error');
    const expectedState = OrderedMap(
      [
        ['1', prepareNoteWithCommunicationError('First test note', '1', 'error1')],
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );

    const actualState = listOfNotes(initialState, deletingNoteFailureAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set property errorId of note when action SENDING_NOTE_TO_SERVER_FAILURE is dispatched.', () => {
    const sendingNoteFailureAction = sendingNoteFailedFactory(() => 'error1')('1', 'Test error');
    const expectedState = OrderedMap(
      [
        ['1', prepareNoteWithCommunicationError('First test note', '1', 'error1')],
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );

    const actualState = listOfNotes(initialState, sendingNoteFailureAction);

    expect(actualState).toEqual(expectedState);
  });


  it('should set property errorId of note when action UPDATING_NOTE_ON_SERVER_FAILURE is dispatched.', () => {
    const sendingNoteFailureAction = updateFailedFactory(() => 'error1')('1', 'Test error');
    const expectedState = OrderedMap(
      [
        ['1', prepareNoteWithCommunicationError('First test note', '1', 'error1')],
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );

    const actualState = listOfNotes(initialState, sendingNoteFailureAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set property errorId to undefined when action CANCEL_FAILED_DELETE_ACTION is dispatched.', () => {
    const cancelDeleteAction = cancelFailedDeleteAction('1', 'error1');
    const initialErrorState = OrderedMap<string, Note>(
      [
        ['1', prepareNoteWithCommunicationError('First test note', '1', 'error1')],
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );
    const expectedState = OrderedMap(
      [
        ['1', prepareNote('First test note', '1', false)],
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );

    const actualState = listOfNotes(initialErrorState, cancelDeleteAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set property errorId to undefined when action CANCEL_FAILED_UPDATE_ACTION is dispatched.', () => {
    const cancelUpdateAction = cancelFailedUpdateAction('1', 'error1', 'First test note');
    const initialErrorState = OrderedMap<string, Note>(
      [
        ['1', prepareNoteWithCommunicationError('First test note updated', '1', 'error1')],
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );
    const expectedState = OrderedMap(
      [
        ['1', prepareNote('First test note', '1', false)],
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );

    const actualState = listOfNotes(initialErrorState, cancelUpdateAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should delete local note of failed addition when action CANCEL_FAILED_ADD_ACTION is dispatched.', () => {
    const cancelAddAction = cancelFailedAddAction('1', 'error1');
    const initialErrorState = OrderedMap<string, Note>(
      [
        ['1', prepareNoteWithCommunicationError('First test note', '1', 'error1')],
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );
    const expectedState = OrderedMap(
      [
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );

    const actualState = listOfNotes(initialErrorState, cancelAddAction);

    expect(actualState).toEqual(expectedState);
  });
});
