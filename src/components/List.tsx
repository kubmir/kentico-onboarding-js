import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListMember } from '../containers-redux/ListMember';

export interface IListDataProps {
  notesIds: string[];
}

export class List extends React.PureComponent<IListDataProps> {
  static propTypes = {
    notesIds: PropTypes.array.isRequired,
  };

  render() {
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
      <div>
        {members}
      </div>
    );
  }
}
