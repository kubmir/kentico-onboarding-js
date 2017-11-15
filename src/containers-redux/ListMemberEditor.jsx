import { connect } from 'react-redux';
import {
  deleteNote,
  updateNote,
  cancelEditingNote,
} from '../actions/actionCreators';
import { ListMemberEditor } from '../components/ListMemberEditor';

const mapStateToProps = (state, ownProps) => ownProps;

export const ListMemberEditorContainer = connect(
  mapStateToProps,
  {
    onDeleteClick: deleteNote,
    onSaveClick: updateNote,
    onCancelClick: cancelEditingNote,
  }
)(ListMemberEditor);
