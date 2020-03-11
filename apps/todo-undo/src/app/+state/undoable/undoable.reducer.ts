import { ActionReducer, Action } from '@ngrx/store';
import { PatchListener, applyPatches, enablePatches } from 'immer';
import { undoType, redoType } from './undoable.actions';

enablePatches();

export type ActionReducerImmer<T, V extends Action = Action> = (
  state: T | undefined,
  action: V,
  patchListener?: PatchListener
) => T;

export function undoablePatch<T>(
  reducer: ActionReducerImmer<T>,
  options?: { maxBufferSize: number }
): ActionReducer<T> {
  const changes = {};
  let changesIndex = -1;

  const initialState: T = reducer(undefined, { type: '' });

  return function undoRedoReducer(state: T = initialState, action: Action): T {
    switch (action.type) {
      case undoType: {
        const undostate = applyPatches(state, changes[changesIndex--].undo);
        return {
          ...undostate,
          ...{
            canUndo: changesIndex in changes,
            canRedo: true
          }
        };
      }
      case redoType: {
        const redoState = applyPatches(state, changes[++changesIndex].redo);
        return {
          ...redoState,
          ...{
            canUndo: true,
            canRedo: changesIndex + 1 in changes
          }
        };
      }
      default:
        let voidAction = true; // Allow to skip actions that do not change state
        const newState = reducer(state, action, (patches, inversePatches) => {
          if (patches.length === 0 && inversePatches.length === 0) {
            return;
          }

          voidAction = false;

          changesIndex++;

          console.log('Changes', patches, inversePatches);

          changes[changesIndex] = {
            redo: patches,
            undo: inversePatches,
            type: action.type
          };

          delete changes[changesIndex + 1];
          delete changes[changesIndex - options.maxBufferSize];
        });

        return voidAction
          ? newState
          : {
              ...newState,
              ...{
                canUndo: true,
                canRedo: false
              }
            };
    }
  };
}
