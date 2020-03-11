import { Action, createReducer, on } from '@ngrx/store';
import produce, { PatchListener } from 'immer';
import * as actions from './tasks.actions';
import { TasksState } from './tasks.models';

const initialState: TasksState = {
  entities: {},
  ids: []
};

const reducer = createReducer(
  initialState,
  on(actions.addTaskSuccess, (state, { task }) => {
    state.entities[task.id] = task;
    state.ids.push(task.id);
    return state;
  }),
  on(actions.deleteTask, (state, { id }) => {
    if (state.entities[id]) {
      delete state.entities[id];
      state.ids.splice(state.ids.indexOf(id), 1);
    }

    return state;
  }),
  on(actions.doneTask, (state, { id }) => {
    if (state.entities[id]) {
      state.entities[id].compleated = true;
    }
    return state;
  })
);

export function tasksReducer(
  state: TasksState | undefined,
  action: Action,
  patchListener?: PatchListener
) {
  return produce(
    state,
    draft => {
      return reducer(draft, action);
    },
    patchListener
  );
}
