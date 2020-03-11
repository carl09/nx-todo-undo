import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addTask, addTaskSuccess } from './tasks.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class TasksEffects {
  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      map(action => {
        return addTaskSuccess({
          task: {
            id: uuidv4(),
            text: action.value,
            createdDate: new Date(),
            compleated: false
          }
        });
      })
    )
  );

  constructor(private actions$: Actions) {}
}
