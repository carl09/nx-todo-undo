import { ActionReducerMap } from '@ngrx/store';
import { TasksState } from './tasks/tasks.models';
import { tasksReducer } from './tasks/tasks.reducer';
import { TasksEffects } from './tasks/tasks.effects';
import { undoablePatch } from './undoable/undoable.reducer';
import { CommonState } from './common/common.models';
import { commonReducer } from './common/common.reducer';

export interface IRootState {
  common: CommonState;
  tasks: TasksState;
  undotasks: TasksState;
}

export const reducers: ActionReducerMap<IRootState> = {
  common: commonReducer,
  tasks: tasksReducer,
  undotasks: undoablePatch(tasksReducer, { maxBufferSize: 50 })
};

export const effects: any[] = [TasksEffects];
