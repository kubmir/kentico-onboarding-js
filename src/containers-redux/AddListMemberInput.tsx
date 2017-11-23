import { connect } from 'react-redux';
import {
  NonEmptyInput,
  NonEmptyInputCallbacksProps
} from '../components/NonEmptyInput';
import {
  startAddingNote,
  stopAddingNote,
} from '../actions/actionCreators';

interface OwnProps {
  text: string;
  updateInsertedText: (text: string) => void;
  addInsertedText: (text: string) => void;
  inputClassName: string;
  isError: boolean;
  enableAutoFocus: boolean;
}

const events: Partial<NonEmptyInputCallbacksProps> = {
  onInputFocus: startAddingNote,
  onInputBlur: stopAddingNote,
};

export const AddListMemberInput = connect<{}, Partial<NonEmptyInputCallbacksProps>, OwnProps>(
  null,
  events
)(NonEmptyInput);
