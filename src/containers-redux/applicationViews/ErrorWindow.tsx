import {
  connect,
  Dispatch
} from 'react-redux';
import { IStoreState } from '../../reducers/IStoreState';
import {
  ErrorWindow as ErrorWindowComponent,
  IErrorWindowCallbacksProps,
  IErrorWindowDataProps
} from '../../components/applicationViews/ErrorWindow';
import { getAllNotes } from '../../actions';

const mapStateToProps = ({ notes }: IStoreState): IErrorWindowDataProps => ({
  errorMessage: notes.loader.errorMessage,
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): IErrorWindowCallbacksProps => ({
  onReloadClick: () =>
    dispatch(getAllNotes()),
});

export const ErrorWindow = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorWindowComponent);
