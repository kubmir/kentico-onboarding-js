import { connect } from 'react-redux';
import {
  ListMember as ListMemberComponent,
  IListMemberDataProps
} from '../components/ListMember';
import { getNoteById } from '../selectors/notes/list/listOfNotes';
import { IStoreState } from '../models/IStoreState';

interface IListMemberOwnProps {
  noteId: string;
  number: number;
}

const mapStateToProps = (state: IStoreState, ownProps: IListMemberOwnProps): IListMemberDataProps => ({
  note: getNoteById(state.notes.listOfNotes, ownProps.noteId),
  ...ownProps,
});

export const ListMember = connect(
  mapStateToProps,
)(ListMemberComponent);
