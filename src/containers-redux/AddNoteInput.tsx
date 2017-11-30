import {
  connect,
  Dispatch
} from 'react-redux';
import {
  NonEmptyInput,
  INonEmptyInputCallbacksProps,
  INonEmptyInputDataProps
} from '../components/NonEmptyInput';
import {
  addNewNote,
  startAddingNote,
  stopAddingNote,
  changeAddingNoteText,
} from '../actions/actionCreators';
import { IAction } from '../models/IAction';
import { IStoreState } from '../models/IStoreState';

interface IOwnProps {
  readonly inputClassName: string;
  readonly isError: boolean;
  readonly enableAutoFocus: boolean;
}

const mapStateToProps = (state: IStoreState, ownProps: IOwnProps): INonEmptyInputDataProps => ({
  text: state.notes.addNoteText,
  ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>): INonEmptyInputCallbacksProps => ({
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
