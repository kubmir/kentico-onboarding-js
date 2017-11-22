import { connect } from 'react-redux';
import { ListMember as ListMemberComponent } from '../components/ListMember';
import { getNoteIsEditActive } from '../selectors/notes/list/listOfNotes';

const mapStateToProps = (state, ownProps) => ({
  note: getNoteIsEditActive(state.notes.listOfNotes, ownProps.noteId),
  ...ownProps,
});

export const ListMember = connect(
  mapStateToProps,
)(ListMemberComponent);
