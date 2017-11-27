import { connect } from 'react-redux';
import {
  NonEmptyInput,
  INonEmptyInputCallbacksProps
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

const events: Partial<INonEmptyInputCallbacksProps> = {
  onInputFocus: startAddingNote,
  onInputBlur: stopAddingNote,
};

export const AddListMemberInput = connect<{}, Partial<INonEmptyInputCallbacksProps>, OwnProps>(
  null,
  events
)(NonEmptyInput);
