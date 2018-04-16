import * as PropTypes from 'prop-types';

export const NotePropType = PropTypes.shape({
  visibleText: PropTypes.string.isRequired,
  serverSynchronizedText: PropTypes.string.isRequired,
  isEditActive: PropTypes.bool.isRequired,
  isCommunicating: PropTypes.bool.isRequired,
}).isRequired;
