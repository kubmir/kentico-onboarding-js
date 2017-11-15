import { connect } from 'react-redux';
import { NonEmptyInput } from '../components/NonEmptyInput';
import {
  startAddingNote,
  stopAddingNote,
} from '../actions/actionCreators';

const mapStateToProps = (state, ownProps) => ownProps;

export const AddListMemberInputContainer = connect(
  mapStateToProps,
  {
    onInputFocus: startAddingNote,
    onInputBlur: stopAddingNote,
  }
)(NonEmptyInput);
