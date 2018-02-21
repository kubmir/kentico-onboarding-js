import * as PropTypes from 'prop-types';

export const NotePropType = PropTypes.shape({
  text: PropTypes.string.isRequired,
  isEditActive: PropTypes.bool.isRequired,
  isCommunicating: PropTypes.bool.isRequired,
  communicationError: PropTypes.string.isRequired,
  failedAction: PropTypes.oneOf(['DELETE', 'ADD', 'UPDATE', '']).isRequired,
}).isRequired;
