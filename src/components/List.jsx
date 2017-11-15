import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ListMemberContainer } from '../containers-redux/ListMember';

export class List extends PureComponent {
  static propTypes = {
    notesIds: ImmutablePropTypes.seq,
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
