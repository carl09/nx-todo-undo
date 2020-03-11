import { IRootState } from '../store';
import { createSelector } from '@ngrx/store';
import { showCompleated } from '../common/common.selectors';

const getUndoableTasks = (state: IRootState) => state.undotasks;

const undoableTasksListIds = createSelector(
  getUndoableTasks,
  state => {
    return state.ids;
  }
);

const undoableTasksListEntities = createSelector(
  getUndoableTasks,
  state => {
    return state.entities;
  }
);

const innerUndoableTasksList = createSelector(
  undoableTasksListIds,
  undoableTasksListEntities,
  (ids, entities) => {
    return ids.map(x => {
      return entities[x];
    });
  }
);

export const undoableTasksList = createSelector(
  showCompleated,
  innerUndoableTasksList,
  (show, tasks) => {
    return show ? tasks : tasks.filter(x => !!x.compleated);
  }
);

export const canUndo = createSelector(
  getUndoableTasks,
  state => state['canUndo']
);

export const canRedo = createSelector(
  getUndoableTasks,
  state => state['canRedo']
);
