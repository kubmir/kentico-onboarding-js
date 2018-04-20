import { connect } from 'react-redux';
import { MainPage as MainPageComponent } from '../../components/applicationViews/MainPage';
import { IStoreState } from '../../reducers/IStoreState';
import { IMainPageDataProps } from '../../components/applicationViews/MainPage';

const mapStateToProps = ({ notes }: IStoreState): IMainPageDataProps => ({
  isLoadingFailed: notes.loader.errorId !== null,
});

export const MainPage = connect(
  mapStateToProps,
)(MainPageComponent);
