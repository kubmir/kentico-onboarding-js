import { connect } from 'react-redux';
import {
  Note as NoteComponent,
  INoteDataProps
} from '../components/Note';
import { getNoteById } from '../selectors/notes/list/listOfNotes';
import { IStoreState } from '../models/IStoreState';
import { Guid } from '../@types/globals';

interface INoteOwnProps {
  readonly noteId: Guid;
  readonly number: number;
}

const mapStateToProps = ({ notes }: IStoreState, ownProps: INoteOwnProps): INoteDataProps => ({
  note: getNoteById(notes.listOfNotes, ownProps.noteId),
  ...ownProps,
});

export const Note = connect(
  mapStateToProps,
)(NoteComponent);
