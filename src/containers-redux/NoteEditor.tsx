import {
  connect,
  Dispatch
} from 'react-redux';
import {
  updateServerNote,
  cancelEditingNote,
  deleteServerNote,
} from '../actions/actionCreators';
import {
  NoteEditor as NoteEditorComponent,
  INoteEditorCallbacksProps,
  INoteEditorDataProps
} from '../components/NoteEditor';
import { getNoteById } from '../selectors/notes/list/listOfNotes';
import { IStoreState } from '../models/IStoreState';

interface INoteEditorOwnProps {
  readonly noteId: Guid;
  readonly number: number;
}

const mapStateToProps = ({ notes }: IStoreState, ownProps: INoteEditorOwnProps): INoteEditorDataProps => ({
  number: ownProps.number,
  note: getNoteById(notes.listOfNotes, ownProps.noteId),
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>, ownProps: INoteEditorOwnProps): INoteEditorCallbacksProps => ({
  onDeleteClick: () =>
    dispatch(deleteServerNote(ownProps.noteId)),
  onCancelEditor: () =>
    dispatch(cancelEditingNote(ownProps.noteId)),
  onSaveClick: (currentNoteText: string) =>
    dispatch(updateServerNote(currentNoteText, ownProps.noteId)),
});

export const NoteEditor = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteEditorComponent);
