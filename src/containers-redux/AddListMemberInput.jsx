import { connect } from 'react-redux';
import { NonEmptyInput } from '../components/NonEmptyInput';
import {
  startFocusingAddListMember,
  stopFocusingAddListMember,
} from '../actions/addListMemberActionCreators';

const mapStateToProps = (state, ownProps) => ownProps;

export const AddListMemberInputContainer = connect(
  mapStateToProps,
  {
    onInputFocus: startFocusingAddListMember,
    onInputBlur: stopFocusingAddListMember,
  }
)(NonEmptyInput);
