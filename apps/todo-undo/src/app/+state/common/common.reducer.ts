import { Action, createReducer, on } from '@ngrx/store';
import { CommonState } from './common.models';
import { showCompleated, hideCompleated } from './common.actions';

const initialState: CommonState = {
  showCompleated: true
};

const reducer = createReducer(
  initialState,
  on(showCompleated, state => {
    return { showCompleated: true };
  }),
  on(hideCompleated, state => {
    return { showCompleated: false };
  })
);

export function commonReducer(state: CommonState | undefined, action: Action) {
  return reducer(state, action);
}
