import { createAction, props } from '@ngrx/store';

const baseAction = '[Common]';

export const showCompleated = createAction(`${baseAction} Show Compleated`);

export const hideCompleated = createAction(`${baseAction} Hide Compleated`);
