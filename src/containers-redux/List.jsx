import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List.tsx';
import { getAllIds } from '../selectors/notes/list/listOfNotes.ts';

const mapStateToProps = (state) => ({
  notesIds: getAllIds(state.notes.listOfNotes),
});

export const List = connect(
  mapStateToProps,
)(ListComponent);
