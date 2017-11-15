import { connect } from 'react-redux';
import { addNewNote } from '../actions/actionCreators';
import { AddListMember } from '../components/AddListMember';

const mapStateToProps = (state) => ({
  isInputFocused: state.notes.isAddingNote,
});

const mapDispatchToProps = (dispatch) => ({
  onAddClick: insertedText =>
    dispatch(addNewNote(insertedText)),
});

export const AddListMemberContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddListMember);
