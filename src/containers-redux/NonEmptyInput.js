import { connect } from 'react-redux';
import { NonEmptyInput } from '../components/NonEmptyInput';
import {
  startFocusingAddListMember,
  stopFocusingAddListMember,
} from '../actions/addListMemberActionCreators';

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStartEditing: () => {
      dispatch(startFocusingAddListMember());
    },
    onClickOutOfInput: () => {
      dispatch(stopFocusingAddListMember());
    },
  };
};

export const NonEmptyInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NonEmptyInput);
