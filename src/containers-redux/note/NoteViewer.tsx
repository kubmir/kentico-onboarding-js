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

interface IOwnProps {
  readonly noteId: Guid;
  readonly number: number;
}

const mapStateToProps = ({ notes }: IStoreState, ownProps: IOwnProps): INoteViewerDataProps => ({
  number: ownProps.number,
  note: getNoteById(notes.listOfNotes, ownProps.noteId),
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IOwnProps): INoteViewerCallbacksProps => ({
  onTextClick: () =>
    dispatch(startEditingNote(ownProps.noteId)),
});

export const NoteViewer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteViewerComponent);
