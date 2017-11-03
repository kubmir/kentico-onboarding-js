import { addListMemberInitialState } from '../../src/utils/addListMemberInitialState';

describe('addListMemberInitialState tests', () => {
  it('returns initial state consisted of empty notes and isAddListMemberTouched set to false', () => {
    const expectedInitialState = {
      isAddListMemberTouched: false,
    };

    const actualInitialState = addListMemberInitialState();

    expect(expectedInitialState).toEqual(actualInitialState);
  });
});
