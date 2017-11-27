import {
  connect,
  Dispatch
} from 'react-redux';
import {
  deleteNote,
  updateNote,
  cancelEditingNote,
} from '../actions/actionCreators';
import {
  NoteEditor as NoteEditorComponent,
  INoteEditorCallbacksProps,
  INoteEditorDataProps
} from '../components/NoteEditor';
import { getNoteById } from '../selectors/notes/list/listOfNotes';
import { IStoreState } from '../models/IStoreState';
import { IAction } from '../models/IAction';

interface INoteEditorOwnProps {
  noteId: string;
  number: number;
}

const mapStateToProps = (state: IStoreState, ownProps: INoteEditorOwnProps): INoteEditorDataProps => ({
  number: ownProps.number,
  note: getNoteById(state.notes.listOfNotes, ownProps.noteId),
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: INoteEditorOwnProps): INoteEditorCallbacksProps => ({
  onDeleteClick: () =>
    dispatch(deleteNote(ownProps.noteId)),
  onCancelEditor: () =>
    dispatch(cancelEditingNote(ownProps.noteId)),
  onSaveClick: (currentNoteText: string) =>
    dispatch(updateNote(currentNoteText, ownProps.noteId)),
});

export const NoteEditor = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteEditorComponent);
