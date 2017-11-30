import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Note } from '../containers-redux/Note';
import { AddNote } from '../containers-redux/AddNote';

export interface IListDataProps {
  notesIds: string[];
}

export class List extends React.PureComponent<IListDataProps> {
  static displayName = 'List';

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
          <Note
            noteId={noteId}
            number={i + 1}
          />
        </li>
      ));

    return (
      <ul className="list-group">
        {members}
        <li className="list-group-item">
          <AddNote />
        </li>
      </ul>
    );
  }
}
