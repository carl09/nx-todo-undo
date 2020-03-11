import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Task } from '../../+state/tasks/tasks.models';

@Component({
  selector: 'nx-todo-undo-tasks-list',
  templateUrl: './tasks-list.component.html',
  styles: [
    `
      :host {
        display: block;
        font-family: sans-serif;
        min-width: 300px;
        max-width: 600px;
        margin: 50px auto;
      }

      .pad-action {
        margin-right: 6px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent {
  @Input() tasks: Task[];
  @Input() heading: string;

  @Output() done: EventEmitter<string> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();

  onDone(event: string) {
    this.done.emit(event);
  }

  onDelete(event: string) {
    this.delete.emit(event);
  }
}
