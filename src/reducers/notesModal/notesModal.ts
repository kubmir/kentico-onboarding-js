import { combineReducers } from 'redux';
import { INotesModalState } from '../../models/IStoreState';
import { modalNote } from './confirmFailedActionModal/modalNote';
import { isConfirmModalVisible } from './confirmFailedActionModal/isConfirmModalVisible';

export const notesModal = combineReducers<INotesModalState>({
  modalNote,
  isConfirmModalVisible,
});
