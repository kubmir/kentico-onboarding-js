import { connect } from 'react-redux';
import { addNewNote } from '../actions/notesActionCreators';
import { AddListMember } from '../components/AddListMember';
import { generateId } from '../utils/generateId';

const mapStateToProps = (state) => {
  return {
    isInputFocused: state.addListMember.isAddListMemberFocused,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddClick: insertedText => {
      dispatch(addNewNote(insertedText, generateId));
    },
  };
};

export const AddListMemberContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddListMember);
