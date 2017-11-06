import { connect } from 'react-redux';
import { NonEmptyInput } from '../components/NonEmptyInput';
import {
  startFocusingAddListMember,
  stopFocusingAddListMember,
} from '../actions/addListMemberActionCreators';

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

export const AddListMemberInputContainer = connect(
  mapStateToProps,
  {
    onInputFocus: startFocusingAddListMember,
    onInputBlur: stopFocusingAddListMember,
  }
)(NonEmptyInput);
