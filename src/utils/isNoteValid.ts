export const isNoteValid = (currentNoteText: string): boolean =>
  currentNoteText
    ? false
    : currentNoteText.length > 0;
