import {
  connect,
  Dispatch
} from 'react-redux';
import { IStoreState } from '../models/IStoreState';
import {
  ErrorWindow as ErrorWindowComponent,
  IErrorWindowCallbacksProps
} from '../components/ErrorWindow';
import { IErrorWindowDataProps } from '../components/ErrorWindow';
import { getAllNotes } from '../actions/actionCreators';

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
