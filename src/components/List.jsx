import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ListMember } from './ListMember';

export class List extends PureComponent {
  static propTypes = {
    notes: ImmutablePropTypes.orderedMapOf(
      ImmutablePropTypes.recordOf({
        text: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        isEditActive: PropTypes.bool.isRequired,
      }),
      PropTypes.string.isRequired,
    ),
  };

  render() {
    const members = this
      .props
      .notes
      .valueSeq()
      .map((note, i) => (
        <li
          className="list-group-item"
          key={note.id}
        >
          <ListMember
            note={note}
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
