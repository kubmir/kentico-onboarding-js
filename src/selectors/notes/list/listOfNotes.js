export const getAllIds = (notes) => notes.keySeq();

export const getNoteWithoutText = (notes, id) => {
  const note = notes
    .get(id);

  return {
    id: note.id,
    isEditActive: note.isEditActive,
  };
};

export const getNoteById = (notes, id) => notes.get(id);
