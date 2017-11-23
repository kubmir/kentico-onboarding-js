type KeyCommands = 'esc' | 'enter';

export interface IKeyMap {
  saveChanges: KeyCommands;
  cancelEditing: KeyCommands;
}
