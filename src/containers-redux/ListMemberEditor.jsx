import { connect } from 'react-redux';
import {
  deleteNote,
  updateNote,
  cancelEditingNote,
} from '../actions/notesActionCreators';
import { ListMemberEditor } from '../components/ListMemberEditor';

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteClick: note => {
      dispatch(deleteNote(note.uid));
    },
    onSaveClick: (textChanges, note) => {
      dispatch(updateNote(textChanges, note.uid));
    },
    cancelNoteEditor: note => {
      dispatch(cancelEditingNote(note.uid));
    },
  };
};

export const ListMemberEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListMemberEditor);
