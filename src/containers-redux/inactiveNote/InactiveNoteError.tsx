import {
  connect,
  Dispatch
} from 'react-redux';
import {
  retryAddNewNote,
  updateServerNote,
  deleteServerNote,
  cancelFailedAddAction,
  cancelFailedDeleteAction,
  cancelFailedUpdateAction
} from '../../actions';
import { IStoreState } from '../../models/IStoreState';
import {
  InactiveNoteError as IInactiveNoteErrorComponent,
  IInactiveNoteErrorCallbackProps,
} from '../../components/inactiveNote/InactiveNoteError';
import { Note } from '../../models/Note';
import { FailedAction } from '../../enums/failedAction';

interface IInactiveNoteErrorOwnProps {
  readonly note: Note;
  readonly number: number;
}

const getRetryAction = (dispatch: Dispatch<IStoreState>, actionType: FailedAction, ownProps: IInactiveNoteErrorOwnProps) => {
  const { text, id } = ownProps.note;

  switch (actionType) {
    case FailedAction.DELETE:
      return dispatch(deleteServerNote(id));
    case FailedAction.UPDATE:
      return dispatch(updateServerNote(text, id));
    case FailedAction.ADD:
      return dispatch(retryAddNewNote(text, id));
    default:
      return;
  }
};

const getCancelFailedAction = (dispatch: Dispatch<IStoreState>, actionType: FailedAction, ownProps: IInactiveNoteErrorOwnProps) => {
  const { id } = ownProps.note;

  switch (actionType) {
    case FailedAction.DELETE:
      return dispatch(cancelFailedDeleteAction(id));
    case FailedAction.UPDATE:
      return dispatch(cancelFailedUpdateAction(id));
    case FailedAction.ADD:
      return dispatch(cancelFailedAddAction(id));
    default:
      return;
  }
};

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>, ownProps: IInactiveNoteErrorOwnProps): IInactiveNoteErrorCallbackProps => ({
  retryFailedAction: (failedAction: FailedAction) =>
    getRetryAction(dispatch, failedAction, ownProps),
  cancelFailedAction: (failedAction: FailedAction) =>
    getCancelFailedAction(dispatch, failedAction, ownProps),
});

export const InactiveNoteError = connect(
  null,
  mapDispatchToProps,
)(IInactiveNoteErrorComponent);
