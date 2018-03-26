import {
  connect,
  Dispatch
} from 'react-redux';
import { IStoreState } from '../../models/IStoreState';
import {
  ErrorWindow as ErrorWindowComponent,
  IErrorWindowCallbacksProps,
  IErrorWindowDataProps
} from '../../components/applicationViews/ErrorWindow';
import { getAllNotes } from '../../actions';

const mapStateToProps = ({ notesLoader }: IStoreState): IErrorWindowDataProps => ({
  errorMessage: notesLoader.errorMessage,
});

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): IErrorWindowCallbacksProps => ({
  onReloadClick: () =>
    dispatch(getAllNotes),
});

export const ErrorWindow = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorWindowComponent);
