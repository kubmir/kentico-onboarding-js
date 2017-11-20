import * as React from 'react';
import * as PropTypes from 'prop-types';

interface ListMemberViewerDataProps {
 note: {
   text: string;
   isEditActive: boolean;
   id: string;
 };
 number: number;
}

interface ListMemberViewerCallbacksProps {
  onTextClick: () => void;
}

type ListMemberViewerProps = ListMemberViewerDataProps & ListMemberViewerCallbacksProps;

export class ListMemberViewer extends React.PureComponent<ListMemberViewerProps> {

  static propTypes = {
    note: PropTypes.shape({
      text: PropTypes.string.isRequired,
      isEditActive: PropTypes.bool.isRequired,
    }),
    number: PropTypes.number.isRequired,
    onTextClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <p onClick={this.props.onTextClick}>{this.props.number + '. ' + this.props.note.text}</p>
    );
  }
}
