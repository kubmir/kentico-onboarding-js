import {
  connect,
  Dispatch
} from 'react-redux';
import {
  addNewNote,
  updateServerNote,
  deleteServerNote,
} from '../actions/actionCreators';
import { IStoreState } from '../models/IStoreState';
import {
  InactiveNoteError as IInactiveNoteErrorComponent,
  IInactiveNoteErrorCallbackProps,
} from '../components/InactiveNoteError';
import { Note } from '../models/Note';

interface IInactiveNoteErrorOwnProps {
  readonly note: Note;
  readonly number: number;
}

const getRetryAction = (dispatch: Dispatch<IStoreState>, actionType: Actions, ownProps: IInactiveNoteErrorOwnProps) => {
  const { text, id } = ownProps.note;

  switch (actionType) {
    case 'DELETE':
      return dispatch(deleteServerNote(id));
    case 'UPDATE':
      return dispatch(updateServerNote(text, id));
    case 'ADD':
      return dispatch(addNewNote(text, id));
    default:
      return;
  }
};

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>, ownProps: IInactiveNoteErrorOwnProps): IInactiveNoteErrorCallbackProps => ({
  retryFailedAction: (actionType: Actions) =>
    getRetryAction(dispatch, actionType, ownProps)
});

export const InactiveNoteError = connect(
  null,
  mapDispatchToProps,
)(IInactiveNoteErrorComponent);
