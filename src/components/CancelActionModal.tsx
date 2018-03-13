import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IAction } from '../models/IAction';
import {
  Modal,
  Button
} from 'react-bootstrap';

export interface ICancelActionModalCallbackProps {
  onRevertClick: (noteId: Guid, failedAction: string) => void;
  onCancelClick: () => IAction;
}

export interface ICancelActionModalDataProps {
  isVisible: boolean;
  isVisibleForNote: Guid;
  failedAction: string;
}

type ICancelActionModalProps = ICancelActionModalCallbackProps & ICancelActionModalDataProps;

export class CancelActionModal extends React.PureComponent<ICancelActionModalProps, {}> {
  static displayName = 'CancelActionModal';

  static propTypes = {
    onRevertClick: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired,
  };

  constructor(props: ICancelActionModalProps) {
    super(props);
  }

  _onRevertClick = () =>
    this.props.onRevertClick(this.props.isVisibleForNote, this.props.failedAction);

  _onCancelClick = () =>
    this.props.onCancelClick();

  render() {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      <div>
        <div className="static-modal">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Confirm revert of operation</Modal.Title>
            </Modal.Header>

            <Modal.Body>Do you really want to revert last failed operation?</Modal.Body>

            <Modal.Footer>
              <Button onClick={this._onCancelClick}>Close</Button>
              <Button
                onClick={this._onRevertClick}
                bsStyle="primary"
              >Revert
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
        ;
      </div>
    );
  }
}
