import {
  connect,
  Dispatch
} from 'react-redux';
import {
  NonEmptyInput,
  INonEmptyInputCallbacksProps,
  INonEmptyInputDataProps
} from '../../components/input/NonEmptyInput';
import {
  addNewNote,
  startAddingNote,
  stopAddingNote,
  changeAddingNoteText,
} from '../../actions';
import { IStoreState } from '../../reducers/IStoreState';

interface IOwnProps {
  readonly inputClassName: string;
  readonly isError: boolean;
}

const mapStateToProps = ({ notes }: IStoreState, ownProps: IOwnProps): INonEmptyInputDataProps => ({
  text: notes.addNoteText,
  enableAutoFocus: false,
  ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): INonEmptyInputCallbacksProps => ({
  onInputFocus: () =>
    dispatch(startAddingNote()),
  onInputBlur: () =>
    dispatch(stopAddingNote()),
  updateInsertedText: (newText: string) =>
    dispatch(changeAddingNoteText(newText)),
  addInsertedText: (newText: string) =>
    dispatch(addNewNote(newText)),
});

export const AddNoteInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NonEmptyInput);
