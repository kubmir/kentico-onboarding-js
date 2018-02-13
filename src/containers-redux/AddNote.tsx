import {
  connect,
  Dispatch
} from 'react-redux';
import { addNewNote } from '../actions/actionCreators';
import {
  AddNote as AddNoteComponent,
  IAddNoteCallbacksProps,
  IAddNoteDataProps
} from '../components/AddNote';
import { IStoreState } from '../models/IStoreState';

const mapStateToProps = ({ notes }: IStoreState): IAddNoteDataProps => ({
  isInputFocused: notes.isAddingNote,
  text: notes.addNoteText,
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): IAddNoteCallbacksProps => ({
  onAddClick: (insertedText: string) =>
    dispatch(addNewNote(insertedText)),
});

export const AddNote = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNoteComponent);
