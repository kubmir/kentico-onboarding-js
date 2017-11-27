import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListMemberEditor } from '../containers-redux/ListMemberEditor';
import { ListMemberViewer } from '../containers-redux/ListMemberViewer';

export interface IListMemberDataProps {
  note: {
    isEditActive: boolean;
  };
  noteId: string;
  number: number;
}

const ListMember: React.StatelessComponent<IListMemberDataProps> = (props: IListMemberDataProps): JSX.Element => {
  const memberEditor = (
    <ListMemberEditor
      noteId={props.noteId}
      number={props.number}
    />
  );

  const memberViewer = (
    <ListMemberViewer
      noteId={props.noteId}
      number={props.number}
    />
  );

  return props.note.isEditActive
    ? memberEditor
    : memberViewer;
};

ListMember.propTypes = {
  note: PropTypes.shape({
    isEditActive: PropTypes.bool.isRequired,
  }).isRequired,
  noteId: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export { ListMember };
