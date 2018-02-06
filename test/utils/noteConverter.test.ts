import { convertNote } from '../../src/utils/noteConverter';

describe('NoteCoverter tests', () => {
  it('Correctly convert server note to application note', () => {
    const text = 'Test text';
    const id = '1';
    const expectedApplicationNote = {
      text,
      id,
      isEditActive: false,
    };
    const serverNote = {
      text,
      id,
      lastModificationDate: new Date(2017, 12, 5),
      creationDate: new Date(2017, 12, 4),
    };

    const actualApplicationNote = convertNote(serverNote);

    expect(actualApplicationNote).toEqual(expectedApplicationNote);
  });
});
