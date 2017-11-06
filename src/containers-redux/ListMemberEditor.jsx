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

export const ListMemberEditorContainer = connect(
  mapStateToProps,
  {
    onDeleteClick: deleteNote,
    onSaveClick: updateNote,
    onCancelClick: cancelEditingNote,
  }
)(ListMemberEditor);
