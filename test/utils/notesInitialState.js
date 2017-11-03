import { OrderedMap } from 'immutable';
import { notesInitialState } from '../../src/utils/notesInitialState';

describe('notesInitialState tests', () => {
  it('returns initial state consisted of empty notes', () => {
    const expectedInitialState = {
      notes: OrderedMap(),
    };

    const actualInitialState = notesInitialState();

    expect(expectedInitialState).toEqual(actualInitialState);
  });
});
