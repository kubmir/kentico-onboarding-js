import {
  connect,
  Dispatch
} from 'react-redux';
import { IStoreState } from '../models/IStoreState';
import {
  CancelActionModal as CancelActionModalComponent,
  ICancelActionModalCallbackProps,
  ICancelActionModalDataProps
} from '../components/CancelActionModal';
import {
  cancelFailedAddAction,
  cancelFailedDeleteAction,
  cancelFailedUpdateAction,
  hideModalAction
} from '../actions/actionCreators';
import {
  ADD,
  DELETE,
  UPDATE
} from '../constants/failedAction';

const mapStateToProps = ({ notesModal }: IStoreState): ICancelActionModalDataProps => ({
  isVisible: notesModal.isConfirmModalVisible,
  isVisibleForNote: notesModal.modalNote.noteId,
  failedAction: notesModal.modalNote.failedAction,
});

const getCancelFailedAction = (dispatch: Dispatch<IStoreState>, noteId: Guid, failedAction: string) => {
  switch (failedAction) {
    case DELETE:
      return dispatch(cancelFailedDeleteAction(noteId));

    case UPDATE:
      return dispatch(cancelFailedUpdateAction(noteId));

    case ADD:
      return dispatch(cancelFailedAddAction(noteId));

    default:
      return;
  }
};

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): ICancelActionModalCallbackProps => ({
  onCancelClick: () =>
    dispatch(hideModalAction()),
  onRevertClick: (noteId: Guid, failedAction: string) =>
    getCancelFailedAction(dispatch, noteId, failedAction),
});

export const CancelActionModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(CancelActionModalComponent);
