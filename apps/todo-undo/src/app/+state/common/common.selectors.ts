import { IRootState } from '../store';
import { createSelector } from '@ngrx/store';

const getCommonState = (state: IRootState) => state.common;

export const showCompleated = createSelector(
  getCommonState,
  state => {
    return state.showCompleated;
  }
);