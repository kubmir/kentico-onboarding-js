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
import { IAction } from '../models/IAction';
import { getAllNotes } from '../actions/serverActionCreators/getActionCreators';

const mapStateToProps = ({ notesLoader }: IStoreState): IErrorWindowDataProps => ({
  errorMessage: notesLoader.errorMessage,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>): IErrorWindowCallbacksProps => ({
  onReloadClick: () =>
    dispatch(getAllNotes),
});


export const ErrorWindow = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorWindowComponent);
