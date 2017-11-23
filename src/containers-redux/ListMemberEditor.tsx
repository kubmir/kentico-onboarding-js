import {
  connect,
  Dispatch
} from 'react-redux';
import {
  deleteNote,
  updateNote,
  cancelEditingNote,
} from '../actions/actionCreators';
import {
  ListMemberEditor as ListMemberEditorComponent,
  ListMemberEditorCallbacksProps,
  ListMemberEditorDataProps
} from '../components/ListMemberEditor';
import { getNoteById } from '../selectors/notes/list/listOfNotes';
import { IStoreState } from '../models/IStoreState';
import { IAction } from '../models/IAction';

interface IListMemberEditorOwnProps {
  noteId: string;
  number: number;
}

const mapStateToProps = (state: IStoreState, ownProps: IListMemberEditorOwnProps): ListMemberEditorDataProps => ({
  number: ownProps.number,
  note: getNoteById(state.notes.listOfNotes, ownProps.noteId),
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IListMemberEditorOwnProps): ListMemberEditorCallbacksProps => ({
  onDeleteClick: () =>
    dispatch(deleteNote(ownProps.noteId)),
  onCancelEditor: () =>
    dispatch(cancelEditingNote(ownProps.noteId)),
  onSaveClick: (currentNoteText: string) =>
    dispatch(updateNote(currentNoteText, ownProps.noteId)),
});

export const ListMemberEditor = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListMemberEditorComponent);
