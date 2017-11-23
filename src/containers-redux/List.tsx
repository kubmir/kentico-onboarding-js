import { connect } from 'react-redux';
import {
  IListDataProps,
  List as ListComponent
} from '../components/List';
import { getAllIds } from '../selectors/notes/list/listOfNotes';
import { IStoreState } from '../models/IStoreState';

const mapStateToProps = (state: IStoreState): IListDataProps => ({
  notesIds: getAllIds(state.notes.listOfNotes),
});

export const List = connect(
  mapStateToProps,
)(ListComponent);
