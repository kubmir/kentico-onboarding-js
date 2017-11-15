import { connect } from 'react-redux';
import {
  deleteNote,
  updateNote,
  cancelEditingNote,
} from '../actions/actionCreators';
import { ListMemberEditor } from '../components/ListMemberEditor';

export const ListMemberEditorContainer = connect(
  null,
  {
    onDeleteClick: deleteNote,
    onSaveClick: updateNote,
    onCancelClick: cancelEditingNote,
  }
)(ListMemberEditor);
