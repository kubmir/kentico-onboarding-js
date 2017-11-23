import { connect } from 'react-redux';
import {
  ListMember as ListMemberComponent,
  ListMemberDataProps
} from '../components/ListMember';
import { getNoteIsEditActive } from '../selectors/notes/list/listOfNotes';
import { IStoreState } from '../models/IStoreState';

interface IListMemberOwnProps {
  noteId: string;
  number: number;
}

const mapStateToProps = (state: IStoreState, ownProps: IListMemberOwnProps): ListMemberDataProps => ({
  note: getNoteIsEditActive(state.notes.listOfNotes, ownProps.noteId),
  ...ownProps,
});

export const ListMember = connect(
  mapStateToProps,
)(ListMemberComponent);
