import { connect } from 'react-redux';
import { startEditingNote } from '../actions/notesActionCreators';
import { ListMemberViewer } from '../components/ListMemberViewer';

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTextClick: note => {
      dispatch(startEditingNote(note.uid));
    },
  };
};

export const ListMemberViewerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListMemberViewer);
