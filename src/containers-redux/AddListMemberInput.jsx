import { connect } from 'react-redux';
import { NonEmptyInput } from '../components/NonEmptyInput';
import {
  startAddingNote,
  stopAddingNote,
} from '../actions/actionCreators';

export const AddListMemberInputContainer = connect(
  null,
  {
    onInputFocus: startAddingNote,
    onInputBlur: stopAddingNote,
  }
)(NonEmptyInput);
