import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IListMemberViewerDataProps {
 note: {
   text: string;
   isEditActive: boolean;
 };
 number: number;
}

export interface IListMemberViewerCallbacksProps {
  onTextClick: () => void;
}

type IListMemberViewerProps = IListMemberViewerDataProps & IListMemberViewerCallbacksProps;

const ListMemberViewer: React.StatelessComponent<IListMemberViewerProps>  = (props: IListMemberViewerProps): JSX.Element => (
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
