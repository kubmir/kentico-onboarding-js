import { connect } from 'react-redux';
import { List } from '../components/List';

const mapStateToProps = (state) => ({
  notes: state.notes.listOfNotes,
});

export const ListContainer = connect(
  mapStateToProps,
)(List);
