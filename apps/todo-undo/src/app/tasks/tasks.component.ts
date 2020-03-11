import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IRootState } from '../+state/store';
import { Observable } from 'rxjs';
import { Task } from '../+state/tasks/tasks.models';
import { taskList } from '../+state/tasks/tasks.selectors';
import {
  undoableTasksList,
  canUndo,
  canRedo
} from '../+state/undoable/undoable.selectors';
import { addTask, doneTask, deleteTask } from '../+state/tasks/tasks.actions';
import { undo, redo } from '../+state/undoable/undoable.actions';
import {
  hideCompleated,
  showCompleated
} from '../+state/common/common.actions';

@Component({
  selector: 'nx-todo-undo-tasks',
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent {
  tasks$: Observable<Task[]>;
  tasksUndoable$: Observable<Task[]>;

  canUndo$: Observable<boolean>;
  canRedo$: Observable<boolean>;

  constructor(private store: Store<IRootState>) {
    this.tasks$ = this.store.pipe(select(taskList));
    this.tasksUndoable$ = this.store.pipe(select(undoableTasksList));

    this.canUndo$ = this.store.pipe(select(canUndo));
    this.canRedo$ = this.store.pipe(select(canRedo));
  }

  onAddTask(event) {
    this.store.dispatch(
      addTask({
        value: event
      })
    );
  }

  onDone(event: string) {
    this.store.dispatch(
      doneTask({
        id: event
      })
    );
  }

  onDelete(event: string) {
    this.store.dispatch(
      deleteTask({
        id: event
      })
    );
  }

  onUndo() {
    this.store.dispatch(undo());
  }

  onRedo() {
    this.store.dispatch(redo());
  }

  onHideCompleated() {
    this.store.dispatch(hideCompleated());
  }

  onShowCompleated() {
    this.store.dispatch(showCompleated());
  }
}
