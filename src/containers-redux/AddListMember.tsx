import {
  connect,
  Dispatch
} from 'react-redux';
import { addNewNote } from '../actions/actionCreators';
import {
  AddListMember,
  AddListMemberCallbacksProps,
  AddListMemberDataProps
} from '../components/AddListMember';
import { IAction } from '../models/IAction';
import { IStore } from '../utils/IStore';

const mapStateToProps = (state: IStore): AddListMemberDataProps => ({
  isInputFocused: state.notes.isAddingNote,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>): AddListMemberCallbacksProps => ({
  onAddClick: (insertedText: string) =>
    dispatch(addNewNote(insertedText)),
});

export const AddListMemberContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddListMember);
