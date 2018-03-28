import { IStoreState } from '../../models/IStoreState';
import { connect } from 'react-redux';
import {
  IAppDataProps,
  App as AppComponent
} from '../../components/applicationViews/App';

const mapStateToProps = ({ notesLoader: { isLoadingNotes } }: IStoreState): IAppDataProps => ({
  isLoadingNotes,
});

export const App = connect(
  mapStateToProps
)(AppComponent);

