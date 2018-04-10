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
  cancelFailedUpdateAction
} from '../../../../src/actions';
import {
  sendingNoteToServerFailed,
  sendingNoteToServerSuccess,
  startReSendingNoteToServer,
  startSendingNoteToServer
} from '../../../../src/actions/thunkFactories/postNoteFactory';
import { Note } from '../../../../src/models/Note';
import { FailedAction } from '../../../../src/enums/FailedAction';
import {
  deletingNoteFromServerFailed,
  deletingNoteFromServerSuccess,
  startDeletingNoteFromServer
} from '../../../../src/actions/thunkFactories/deleteNoteFactory';
import { storeLoadedNotes } from '../../../../src/actions/thunkFactories/getNotesFactory';
import {
  startUpdatingNoteOnServer,
  updatingNoteOnServerFailed,
  updatingNoteOnServerSuccess
} from '../../../../src/actions/thunkFactories/putNoteFactory';

describe('Reducer listOfNotes tests', () => {
  let initialState: OrderedMap<Guid, Note>;

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

  it('action LOADING_NOTE_SUCCESS should add all loaded notes to state notes', () => {
    const loadingSuccessAction = storeLoadedNotes(initialState);
    const expectedState = initialState;

    const actualState = listOfNotes(OrderedMap(), loadingSuccessAction);

    expect(actualState).toEqual(expectedState);
  });

  it('action START_SENDING_NOTE_TO_SERVER should add new note to state notes', () => {
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

  it('action START_RESENDING_NOTE_TO_SERVER should update isCommunicating and communicationError property of state note', () => {
    const resendingAction = startReSendingNoteToServer('2');
    const expectedState = OrderedMap([
      ['1', prepareNote('First test note', '1', false)],
      ['2', prepareLocalNote('Second test note', '2')],
    ]);

    const actualState = listOfNotes(initialState, resendingAction);

    expect(actualState).toEqual(expectedState);
  });

  it('action SENDING_NOTE_TO_SERVER_SUCCESS should add new note to state notes', () => {
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

  it('action UPDATING_NOTE_ON_SERVER_SUCCESS should update note with specific noteId', () => {
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

  it('action UPDATING_NOTE_ON_SERVER_SUCCESS should not change visibleText of note if no changes are made', () => {
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

  it('action START_DELETING_NOTE_FROM_SERVER should set property isCommunicating of note to true', () => {
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

  it('action START_UPDATING_NOTE_ON_SERVER should set property isCommunicating of note to true', () => {
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

  it('action DELETING_NOTE_FROM_SERVER_FAILURE should set property isCommunicating of note to false, communicationError and failedAction', () => {
    const deletingNoteFailureAction = deletingNoteFromServerFailed('1', 'Test error');
    const expectedState = OrderedMap(
      [
        ['1', prepareNoteWithCommunicationError('First test note', '1', 'Test error', FailedAction.DELETE)],
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );

    const actualState = listOfNotes(initialState, deletingNoteFailureAction);

    expect(actualState).toEqual(expectedState);
  });

  it('action SENDING_NOTE_TO_SERVER_FAILURE should set property isCommunicating of note to false, communicationError and failedAction', () => {
    const sendingNoteFailureAction = sendingNoteToServerFailed('1', 'Test error');
    const expectedState = OrderedMap(
      [
        ['1', prepareNoteWithCommunicationError('First test note', '1', 'Test error', FailedAction.ADD)],
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );

    const actualState = listOfNotes(initialState, sendingNoteFailureAction);

    expect(actualState).toEqual(expectedState);
  });


  it('action UPDATING_NOTE_ON_SERVER_FAILURE should set property isCommunicating of note to false, communicationError and failedAction', () => {
    const sendingNoteFailureAction = updatingNoteOnServerFailed('1', 'Test error');
    const expectedState = OrderedMap(
      [
        ['1', prepareNoteWithCommunicationError('First test note', '1', 'Test error', FailedAction.UPDATE)],
        ['2', prepareNote('Second test note', '2', false)],
      ],
    );

    const actualState = listOfNotes(initialState, sendingNoteFailureAction);

    expect(actualState).toEqual(expectedState);
  });

  it('action CANCEL_FAILED_DELETE_ACTION should set property isCommunicating to false, communicationError and failedAction to empty', () => {
    const cancelDeleteAction = cancelFailedDeleteAction('1');
    const initialErrorState = OrderedMap<string, Note>(
      [
        ['1', prepareNoteWithCommunicationError('First test note', '1', 'Test error', FailedAction.DELETE)],
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

  it('action CANCEL_FAILED_UPDATE_ACTION should set property isCommunicating to false, communicationError and failedAction to empty', () => {
    const cancelUpdateAction = cancelFailedUpdateAction('1', 'First test note');
    const initialErrorState = OrderedMap<string, Note>(
      [
        ['1', prepareNoteWithCommunicationError('First test note updated', '1', 'Test error', FailedAction.UPDATE)],
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

  it('action CANCEL_FAILED_ADD_ACTION should delete local note of failed addition', () => {
    const cancelAddAction = cancelFailedAddAction('1');
    const initialErrorState = OrderedMap<string, Note>(
      [
        ['1', prepareNoteWithCommunicationError('First test note', '1', 'Test error', FailedAction.UPDATE)],
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
