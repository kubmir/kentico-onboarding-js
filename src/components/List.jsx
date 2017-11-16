import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListMemberContainer } from '../containers-redux/ListMember';

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
          <ListMemberContainer
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
