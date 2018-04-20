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
import { getErrorById } from '../../selectors/errors/getErrorById';

const mapStateToProps = ({ notes, errors }: IStoreState): IErrorWindowDataProps => {
  const error = getErrorById(errors, notes.loader.errorId);

  return {
    errorMessage: error.errorDescription,
    errorId: notes.loader.errorId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): IErrorWindowCallbacksProps => ({
  onReloadClick: (errorId?: Guid) =>
    dispatch(getAllNotes(errorId)),
});

export const ErrorWindow = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorWindowComponent);
