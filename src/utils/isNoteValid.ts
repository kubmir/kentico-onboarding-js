export const isNoteValid = (currentNoteText: string): boolean =>
  !!currentNoteText && currentNoteText.length > 0;
