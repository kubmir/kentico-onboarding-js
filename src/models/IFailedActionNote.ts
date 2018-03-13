const NO_FAILED_ACTION = '';
const NO_NOTE_WITH_FAILED_ACTION = '';

export interface IFailedActionNote {
  readonly noteId: Guid;
  readonly failedAction: string;
}

export const defaultFailedActionNote: IFailedActionNote = {
  noteId: NO_NOTE_WITH_FAILED_ACTION,
  failedAction: NO_FAILED_ACTION,
};
