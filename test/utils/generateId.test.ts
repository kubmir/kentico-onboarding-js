import { generateLocalId } from '../../src/utils/generateLocalId';

describe('ID generator', () => {
  it('returns id matching conditions for uuid4', () => {
    const uidRegex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    const actualUid = generateLocalId();

    expect(uidRegex.test(actualUid)).toBeTruthy();
  });

  it('returns different id in every call', () => {
    const firstUid = generateLocalId();
    const secondUid = generateLocalId();

    expect(firstUid).not.toEqual(secondUid);
  });
});
