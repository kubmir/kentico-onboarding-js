import { addListMemberInitialState } from '../../src/utils/addListMemberInitialState';

describe('addListMemberInitialState tests', () => {
  it('returns initial state consisting of isAddListMemberTouched set to false', () => {
    const expectedInitialState = {
      isAddListMemberFocused: false,
    };

    const actualInitialState = addListMemberInitialState();

    expect(expectedInitialState).toEqual(actualInitialState);
  });
});
