import { connect } from 'react-redux';
import { startEditingNote } from '../actions/actionCreators';
import { ListMemberViewer as ListMemberViewerComponent } from '../components/ListMemberViewer';
import { getNoteById } from '../selectors/notes/list/listOfNotes';

const mapStateToProps = (state, ownProps) => ({
  number: ownProps.number,
  note: getNoteById(state.notes.listOfNotes, ownProps.id),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onTextClick: () =>
    dispatch(startEditingNote(ownProps.id)),
});

export const ListMemberViewer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListMemberViewerComponent);
