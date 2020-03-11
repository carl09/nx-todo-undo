import { IRootState } from '../store';
import { createSelector } from '@ngrx/store';
import { showCompleated } from '../common/common.selectors';

const getTasksstate = (state: IRootState) => state.tasks;

const taskListIds = createSelector(
  getTasksstate,
  state => {
    return state.ids;
  }
);

const taskListEntities = createSelector(
  getTasksstate,
  state => {
    return state.entities;
  }
);

export const innerTaskList = createSelector(
  taskListIds,
  taskListEntities,
  (ids, entities) => {
    return ids.map(x => {
      return entities[x];
    });
  }
);

export const taskList = createSelector(
  showCompleated,
  innerTaskList,
  (show, tasks) => {
    return show ? tasks : tasks.filter(x => !!x.compleated);
  }
);
