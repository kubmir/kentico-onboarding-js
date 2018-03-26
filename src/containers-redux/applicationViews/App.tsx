import { IStoreState } from '../../models/IStoreState';
import { connect } from 'react-redux';
import {
  IAppDataProps,
  App as AppComponent
} from '../../components/applicationViews/App';

const mapStateToProps = ({ notesLoader }: IStoreState): IAppDataProps => ({
  isLoadingNotes: notesLoader.isLoadingNotes,
  isLoadingFailed: notesLoader.isLoadingFailed,
});

export const App = connect(
  mapStateToProps
)(AppComponent);

