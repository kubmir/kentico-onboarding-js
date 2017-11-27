import {
  connect,
  Dispatch
} from 'react-redux';
import { addNewNote } from '../actions/actionCreators';
import {
  AddListMember as AddListMemberComponent,
  IAddListMemberCallbacksProps,
  IAddListMemberDataProps
} from '../components/AddListMember';
import { IAction } from '../models/IAction';
import { IStoreState } from '../models/IStoreState';

const mapStateToProps = (state: IStoreState): IAddListMemberDataProps => ({
  isInputFocused: state.notes.isAddingNote,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>): IAddListMemberCallbacksProps => ({
  onAddClick: (insertedText: string) =>
    dispatch(addNewNote(insertedText)),
});

export const AddListMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddListMemberComponent);
