import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface ListMemberViewerDataProps {
 note: {
   text: string;
   isEditActive: boolean;
 };
 number: number;
}

export interface ListMemberViewerCallbacksProps {
  onTextClick: () => void;
}

type ListMemberViewerProps = ListMemberViewerDataProps & ListMemberViewerCallbacksProps;

const ListMemberViewer: React.StatelessComponent<ListMemberViewerProps>  = (props: ListMemberViewerProps) => (
  <p onClick={props.onTextClick}>{props.number + '. ' + props.note.text}</p>
);

ListMemberViewer.propTypes = {
  note: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isEditActive: PropTypes.bool.isRequired,
  }),
  number: PropTypes.number.isRequired,
  onTextClick: PropTypes.func.isRequired,
};

export { ListMemberViewer };
