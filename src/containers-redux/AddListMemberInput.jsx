import { connect } from 'react-redux';
import { NonEmptyInput } from '../components/NonEmptyInput';
import {
  startAddingNote,
  stopAddingNote,
} from '../actions/addListMemberActionCreators';

const mapStateToProps = (state, ownProps) => ownProps;

export const AddListMemberInputContainer = connect(
  mapStateToProps,
  {
    onInputFocus: startAddingNote,
    onInputBlur: stopAddingNote,
  }
)(NonEmptyInput);
