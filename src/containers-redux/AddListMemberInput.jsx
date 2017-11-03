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
    onFocusOutOfInput: () => {
      dispatch(stopFocusingAddListMember());
    },
  };
};

export const AddListMemberInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NonEmptyInput);
