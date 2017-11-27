import { connect } from 'react-redux';
import {
  Note as NoteComponent,
  INoteDataProps
} from '../components/Note';
import { getNoteById } from '../selectors/notes/list/listOfNotes';
import { IStoreState } from '../models/IStoreState';

interface INoteOwnProps {
  noteId: string;
  number: number;
}

const mapStateToProps = (state: IStoreState, ownProps: INoteOwnProps): INoteDataProps => ({
  note: getNoteById(state.notes.listOfNotes, ownProps.noteId),
  ...ownProps,
});

export const Note = connect(
  mapStateToProps,
)(NoteComponent);
