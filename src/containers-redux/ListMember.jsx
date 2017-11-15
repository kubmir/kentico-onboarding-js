import { connect } from 'react-redux';
import { ListMember } from '../components/ListMember';
import { getNoteWithoutText } from '../selectors/notes/list/listOfNotes';

const mapStateToProps = (state, ownProps) => ({
  note: getNoteWithoutText(state.notes.listOfNotes, ownProps.noteId),
});

export const ListMemberContainer = connect(
  mapStateToProps,
)(ListMember);
