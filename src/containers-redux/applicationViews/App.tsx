import { IStoreState } from '../../models/IStoreState';
import {
  connect,
  Dispatch
} from 'react-redux';
import {
  IAppDataProps,
  App as AppComponent,
  IAppCallbacksProps
} from '../../components/applicationViews/App';
import { getAllNotes } from '../../actions';

const mapStateToProps = ({ notesLoader: { isLoadingNotes } }: IStoreState): IAppDataProps => ({
  isLoadingNotes,
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): IAppCallbacksProps => ({
  loadNotesFromServer: () =>
    dispatch(getAllNotes()),
});

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

