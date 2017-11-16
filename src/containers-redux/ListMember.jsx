import { connect } from 'react-redux';
import { ListMember } from '../components/ListMember';
import { getNoteIsEditActive } from '../selectors/notes/list/listOfNotes';

const mapStateToProps = (state, ownProps) => ({
  note: getNoteIsEditActive(state.notes.listOfNotes, ownProps.noteId),
});

export const ListMemberContainer = connect(
  mapStateToProps,
)(ListMember);
