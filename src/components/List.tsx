import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListMember } from '../containers-redux/ListMember';
import { AddListMember } from '../containers-redux/AddListMember';

export interface IListDataProps {
  notesIds: string[];
}

export class List extends React.PureComponent<IListDataProps> {
  static propTypes = {
    notesIds: PropTypes.array.isRequired,
  };

  render(): JSX.Element {
    const members = this
      .props
      .notesIds
      .map((noteId: string, i: number) => (
        <li
          className="list-group-item"
          key={noteId}
        >
          <ListMember
            noteId={noteId}
            number={i + 1}
          />
        </li>
      ));

    return (
      <ul className="list-group">
        {members}
        <li className="list-group-item">
          <AddListMember />
        </li>
      </ul>
    );
  }
}
