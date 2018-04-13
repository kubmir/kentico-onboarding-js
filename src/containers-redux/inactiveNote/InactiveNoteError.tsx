import {
  connect,
  Dispatch
} from 'react-redux';
import { IStoreState } from '../../reducers/IStoreState';
import {
  InactiveNoteError as IInactiveNoteErrorComponent,
  IInactiveNoteErrorCallbackProps,
} from '../../components/inactiveNote/InactiveNoteError';
import { Note } from '../../models/Note';
import { getFailedActionCallbacks } from '../../utils/getFailedActionCallbacks';

interface IInactiveNoteErrorOwnProps {
  readonly note: Note;
  readonly number: number;
}

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>, ownProps: IInactiveNoteErrorOwnProps): IInactiveNoteErrorCallbackProps => {
  const failedActionObject = getFailedActionCallbacks(ownProps.note.failedAction);

  return {
    retryFailedAction: () =>
      dispatch(failedActionObject.retryFailedAction(ownProps.note.id, ownProps.note.visibleText)),

    cancelFailedAction: () =>
      dispatch(failedActionObject.cancelFailedAction(ownProps.note.id, ownProps.note.serverSynchronizedText)),

    getFailedActionTooltipText: () =>
      failedActionObject.getFailedActionTooltipText(),
  };
};

export const InactiveNoteError = connect(
  null,
  mapDispatchToProps,
)(IInactiveNoteErrorComponent);
