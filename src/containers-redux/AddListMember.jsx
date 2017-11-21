import { connect } from 'react-redux';
import { addNewNote } from '../actions/actionCreators.ts';
import { AddListMember as AddListMemberComponent } from '../components/AddListMember.tsx';

const mapStateToProps = (state) => ({
  isInputFocused: state.notes.isAddingNote,
});

const mapDispatchToProps = (dispatch) => ({
  onAddClick: insertedText =>
    dispatch(addNewNote(insertedText)),
});

export const AddListMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddListMemberComponent);
