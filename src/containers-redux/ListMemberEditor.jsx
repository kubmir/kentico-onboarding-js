import { connect } from 'react-redux';
import {
  deleteNote,
  updateNote,
  cancelEditingNote,
} from '../actions/actionCreators';
import { ListMemberEditor } from '../components/ListMemberEditor';
import { getNoteById } from '../selectors/notes/list/listOfNotes';

const mapStateToProps = (state, ownProps) => ({
  number: ownProps.number,
  note: getNoteById(state.notes.listOfNotes, ownProps.id),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDeleteClick: () =>
    dispatch(deleteNote(ownProps.id)),
  onCancelEditor: () =>
    dispatch(cancelEditingNote(ownProps.id)),
  onSaveClick: (currentNoteText) =>
    dispatch(updateNote(currentNoteText, ownProps.id)),
});

export const ListMemberEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListMemberEditor);
