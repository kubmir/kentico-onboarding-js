import { connect } from 'react-redux';
import { addNewNote } from '../actions/notesActionCreators';
import { AddListMember } from '../components/AddListMember';
import { generateUid } from '../utils/generateUid';
import { startFocusingAddListMember } from '../actions/addListMemberActionCreators';

const mapStateToProps = (state) => {
  return {
    isInputFocused: state.addListMember.isAddListMemberFocused,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddClick: insertedText => {
      dispatch(addNewNote(insertedText, generateUid));
    },
    onInputFocus: () => {
      dispatch(startFocusingAddListMember());
    },
  };
};

export const AddListMemberContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddListMember);
