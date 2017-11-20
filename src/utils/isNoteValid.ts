import { isNullOrUndefined } from 'util';

export const isNoteValid = (currentNoteText: string): boolean =>
  isNullOrUndefined(currentNoteText)
    ? false
    : currentNoteText.length > 0;
