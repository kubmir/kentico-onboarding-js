import { connect } from 'react-redux';
import { startEditingNote } from '../actions/notesActionCreators';
import { ListMemberViewer } from '../components/ListMemberViewer';

const mapStateToProps = (state, ownProps) => ownProps;

export const ListMemberViewerContainer = connect(
  mapStateToProps,
  { onTextClick: startEditingNote }
)(ListMemberViewer);
