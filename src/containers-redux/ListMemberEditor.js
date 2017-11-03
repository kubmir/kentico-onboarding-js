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
    onSaveClick: (textChanges, uid) => {
      dispatch(updateNote(textChanges, uid));
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
