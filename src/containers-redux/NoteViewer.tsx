import {
  connect,
  Dispatch
} from 'react-redux';
import { startEditingNote } from '../actions/actionCreators';
import {
  NoteViewer as NoteViewerComponent,
  INoteViewerCallbacksProps,
  INoteViewerDataProps
} from '../components/NoteViewer';
import { getNoteById } from '../selectors/notes/list/listOfNotes';
import { IStoreState } from '../models/IStoreState';
import { IAction } from '../models/IAction';
import { Guid } from '../@types/globals';

interface IOwnProps {
  readonly noteId: Guid;
  readonly number: number;
}

const mapStateToProps = (state: IStoreState, ownProps: IOwnProps): INoteViewerDataProps => ({
  number: ownProps.number,
  note: getNoteById(state.notes.listOfNotes, ownProps.noteId),
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IOwnProps): INoteViewerCallbacksProps => ({
  onTextClick: () =>
    dispatch(startEditingNote(ownProps.noteId)),
});

export const NoteViewer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteViewerComponent);
