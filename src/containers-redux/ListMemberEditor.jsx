import { connect } from 'react-redux';
import {
  deleteNote,
  updateNote,
  cancelEditingNote,
} from '../actions/actionCreators.ts';
import { ListMemberEditor as ListMemberEditorComponent } from '../components/ListMemberEditor.tsx';
import { getNoteById } from '../selectors/notes/list/listOfNotes.ts';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  note: getNoteById(state.notes.listOfNotes, ownProps.noteId),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDeleteClick: () =>
    dispatch(deleteNote(ownProps.noteId)),
  onCancelEditor: () =>
    dispatch(cancelEditingNote(ownProps.noteId)),
  onSaveClick: (currentNoteText) =>
    dispatch(updateNote(currentNoteText, ownProps.noteId)),
});

export const ListMemberEditor = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListMemberEditorComponent);
