import { IStoreState } from '../models/IStoreState';
import { IAppDataProps } from '../components/App';
import { connect } from 'react-redux';
import { App as AppComponent } from '../components/App';

const mapStateToProps = ({ notesLoader }: IStoreState): IAppDataProps => ({
  isLoadingNotes: notesLoader.isLoadingNotes,
});

export const App = connect(
  mapStateToProps
)(AppComponent);

