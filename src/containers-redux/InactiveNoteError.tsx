import {
  connect,
  Dispatch
} from 'react-redux';
import {
  retryAddNewNote,
  updateServerNote,
  deleteServerNote,
} from '../actions/actionCreators';
import { IStoreState } from '../models/IStoreState';
import {
  InactiveNoteError as IInactiveNoteErrorComponent,
  IInactiveNoteErrorCallbackProps,
} from '../components/InactiveNoteError';
import { Note } from '../models/Note';
import {
  ADD,
  DELETE,
  UPDATE
} from '../constants/failedAction';

interface IInactiveNoteErrorOwnProps {
  readonly note: Note;
  readonly number: number;
}

const getRetryAction = (dispatch: Dispatch<IStoreState>, actionType: FailedAction, ownProps: IInactiveNoteErrorOwnProps) => {
  const { text, id } = ownProps.note;

  switch (actionType) {
    case DELETE:
      return dispatch(deleteServerNote(id));
    case UPDATE:
      return dispatch(updateServerNote(text, id));
    case ADD:
      return dispatch(retryAddNewNote(text, id));
    default:
      return;
  }
};

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>, ownProps: IInactiveNoteErrorOwnProps): IInactiveNoteErrorCallbackProps => ({
  retryFailedAction: (failedAction: FailedAction) =>
    getRetryAction(dispatch, failedAction, ownProps)
});

export const InactiveNoteError = connect(
  null,
  mapDispatchToProps,
)(IInactiveNoteErrorComponent);
