import { connect } from 'react-redux';
import { startEditingNote } from '../actions/actionCreators';
import { ListMemberViewer } from '../components/ListMemberViewer';

export const ListMemberViewerContainer = connect(
  null,
  { onTextClick: startEditingNote }
)(ListMemberViewer);
