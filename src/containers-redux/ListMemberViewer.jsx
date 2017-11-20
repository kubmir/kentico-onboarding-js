import { connect } from 'react-redux';
import { startEditingNote } from '../actions/actionCreators';
import { ListMemberViewer as ListMemberViewerComponent } from '../components/ListMemberViewer.tsx';
import { getNoteById } from '../selectors/notes/list/listOfNotes';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  note: getNoteById(state.notes.listOfNotes, ownProps.noteId),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onTextClick: () =>
    dispatch(startEditingNote(ownProps.noteId)),
});

export const ListMemberViewer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListMemberViewerComponent);
