import { createAction } from '@ngrx/store';

const baseAction = '[UNDOABLE]';

export const undoType = `${baseAction} undo`;
export const redoType = `${baseAction} redo`;

export const undo = createAction(undoType);
export const redo = createAction(redoType);
