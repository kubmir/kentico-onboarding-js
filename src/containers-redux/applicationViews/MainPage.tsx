import { connect } from 'react-redux';
import { MainPage as MainPageComponent } from '../../components/applicationViews/MainPage';
import { IStoreState } from '../../reducers/IStoreState';
import { IMainPageDataProps } from '../../components/applicationViews/MainPage';

const mapStateToProps = ({ notesLoader: { isLoadingFailed } }: IStoreState): IMainPageDataProps => ({
  isLoadingFailed,
});

export const MainPage = connect(
  mapStateToProps,
)(MainPageComponent);
