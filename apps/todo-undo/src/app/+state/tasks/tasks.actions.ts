import { createAction, props } from '@ngrx/store';
import { Task } from './tasks.models';

const baseAction = '[Tasks]';

export const addTask = createAction(
  `${baseAction} Add`,
  props<{ value: string }>()
);

export const addTaskSuccess = createAction(
  `${baseAction} Add Success`,
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  `${baseAction} Delete`,
  props<{ id: string }>()
);

export const doneTask = createAction(
    `${baseAction} Done`,
    props<{ id: string }>()
  );
