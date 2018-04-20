import {
  connect,
  Dispatch
} from 'react-redux';
import { startEditingNote } from '../../actions';
import {
  NoteViewer as NoteViewerComponent,
  INoteViewerCallbacksProps,
  INoteViewerDataProps
} from '../../components/note/NoteViewer';
import { getNoteById } from '../../selectors/notes/list/listOfNotes';
import { IStoreState } from '../../reducers/IStoreState';
import { IAction } from '../../actions/IAction';
import { getErrorById } from '../../selectors/errors/getErrorById';
import { ApplicationError } from '../../models/ApplicationError';

interface IOwnProps {
  readonly noteId: Guid;
  readonly number: number;
}

const mapStateToProps = ({ notes, errors }: IStoreState, ownProps: IOwnProps): INoteViewerDataProps => {
  const note = getNoteById(notes.listOfNotes, ownProps.noteId);

  return {
    number: ownProps.number,
    note,
    error: note.errorId === undefined ? new ApplicationError() : getErrorById(errors, note.errorId)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IOwnProps): INoteViewerCallbacksProps => ({
  onTextClick: () =>
    dispatch(startEditingNote(ownProps.noteId)),
});

export const NoteViewer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteViewerComponent);
