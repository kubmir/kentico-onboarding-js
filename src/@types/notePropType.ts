import * as PropTypes from 'prop-types';
import { FailedAction } from '../enums/failedAction';

export const NotePropType = PropTypes.shape({
  visibleText: PropTypes.string.isRequired,
  serverSynchronizedText: PropTypes.string.isRequired,
  isEditActive: PropTypes.bool.isRequired,
  isCommunicating: PropTypes.bool.isRequired,
  communicationError: PropTypes.string.isRequired,
  failedAction: PropTypes.oneOf([
    FailedAction.UPDATE,
    FailedAction.DELETE,
    FailedAction.ADD,
    FailedAction.NO_FAILURE
  ]).isRequired,
}).isRequired;
