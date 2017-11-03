import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { AddListMemberContainer } from '../containers-redux/AddListMember';
import ListMember from './ListMember';

export class List extends PureComponent {
  static propTypes = {
    notes: ImmutablePropTypes.orderedMapOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
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
          key={note.uid}
        >
          <ListMember
            note={note}
            number={i + 1}
          />
        </li>
      ));

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-1 col-md-10">
          <ul className="list-group">
            {members}
            <li className="list-group-item">
              <AddListMemberContainer />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
