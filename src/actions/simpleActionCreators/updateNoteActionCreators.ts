import {
  CANCEL_EDITING_NOTE,
  CANCEL_FAILED_ADD_ACTION,
  CANCEL_FAILED_DELETE_ACTION,
  CANCEL_FAILED_UPDATE_ACTION,
  START_EDITING_NOTE
} from '../../constants/actionTypes';
import { IAction } from '../IAction';

export const startEditingNote = (noteId: Guid): IAction => ({
  type: START_EDITING_NOTE,
  payload: {
    noteId,
  },
});

export const cancelEditingNote = (noteId: Guid): IAction => ({
  type: CANCEL_EDITING_NOTE,
  payload: {
    noteId,
  },
});

export const cancelFailedDeleteAction = (noteId: Guid): IAction => ({
  type: CANCEL_FAILED_DELETE_ACTION,
  payload: {
    noteId,
  }
});

export const cancelFailedUpdateAction = (noteId: Guid, serverSynchronizedText: string): IAction => ({
  type: CANCEL_FAILED_UPDATE_ACTION,
  payload: {
    noteId,
    serverSynchronizedText,
  }
});

export const cancelFailedAddAction = (noteId: Guid): IAction => ({
  type: CANCEL_FAILED_ADD_ACTION,
  payload: {
    noteId,
  }
});
