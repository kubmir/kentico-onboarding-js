import * as PropTypes from 'prop-types';
import {
  ADD,
  DELETE,
  NO_FAILURE,
  UPDATE
} from '../constants/failedAction';

export const NotePropType = PropTypes.shape({
  text: PropTypes.string.isRequired,
  isEditActive: PropTypes.bool.isRequired,
  isCommunicating: PropTypes.bool.isRequired,
  communicationError: PropTypes.string.isRequired,
  failedAction: PropTypes.oneOf([DELETE, ADD, UPDATE, NO_FAILURE]).isRequired,
}).isRequired;
