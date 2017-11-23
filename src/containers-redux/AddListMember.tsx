import {
  connect,
  Dispatch
} from 'react-redux';
import { addNewNote } from '../actions/actionCreators';
import {
  AddListMember as AddListMemberComponent,
  AddListMemberCallbacksProps,
  AddListMemberDataProps
} from '../components/AddListMember';
import { IAction } from '../models/IAction';
import { IStoreState } from '../models/IStoreState';

const mapStateToProps = (state: IStoreState): AddListMemberDataProps => ({
  isInputFocused: state.notes.isAddingNote,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>): AddListMemberCallbacksProps => ({
  onAddClick: (insertedText: string) =>
    dispatch(addNewNote(insertedText)),
});

export const AddListMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddListMemberComponent);
