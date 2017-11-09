import { OrderedMap } from 'immutable';
import { notesInitialState } from '../../src/utils/notesInitialState';

describe('notesInitialState tests', () => {
  it('returns initial state consisting of empty notes ordered map', () => {
    const expectedInitialState = {
      notes: OrderedMap(),
    };

    const actualInitialState = notesInitialState();

    expect(expectedInitialState).toEqual(actualInitialState);
  });
});
