import {
  connect,
  Dispatch
} from 'react-redux';
import { startEditingNote } from '../actions/actionCreators';
import {
  ListMemberViewer as ListMemberViewerComponent,
  ListMemberViewerCallbacksProps,
  ListMemberViewerDataProps
} from '../components/ListMemberViewer';
import { getNoteById } from '../selectors/notes/list/listOfNotes';
import { IStoreState } from '../models/IStoreState';
import { IAction } from '../models/IAction';

interface IOwnProps {
  noteId: string;
  number: number;
}

const mapStateToProps = (state: IStoreState, ownProps: IOwnProps): ListMemberViewerDataProps => ({
  number: ownProps.number,
  note: getNoteById(state.notes.listOfNotes, ownProps.noteId),
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IOwnProps): ListMemberViewerCallbacksProps => ({
  onTextClick: () =>
    dispatch(startEditingNote(ownProps.noteId)),
});

export const ListMemberViewer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListMemberViewerComponent);
