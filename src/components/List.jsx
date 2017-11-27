import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListMember } from '../containers-redux/ListMember';
import { AddListMember } from '../containers-redux/AddListMember';

export class List extends PureComponent {
  static propTypes = {
    notesIds: PropTypes.array.isRequired,
  };

  render() {
    const members = this
      .props
      .notesIds
      .map((noteId, i) => (
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
