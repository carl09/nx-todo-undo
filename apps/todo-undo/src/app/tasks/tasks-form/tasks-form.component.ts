import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'nx-todo-undo-tasks-form',
  templateUrl: './tasks-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
        font-family: sans-serif;
        min-width: 300px;
        max-width: 600px;
        margin: 50px auto;
      }
    `
  ]
})
export class TasksFormComponent {
  @Input() canUndo: boolean;
  @Input() canRedo: boolean;

  @Output() addTask: EventEmitter<string> = new EventEmitter();
  @Output() undo: EventEmitter<void> = new EventEmitter();
  @Output() redo: EventEmitter<void> = new EventEmitter();
  @Output() showCompleated: EventEmitter<void> = new EventEmitter();
  @Output() hideCompleated: EventEmitter<void> = new EventEmitter();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      task: new FormControl(undefined, Validators.required)
    });
  }

  onSubmit(event: any) {
    this.addTask.emit(event.task);
    this.form.reset();
  }

  onUndo() {
    this.undo.emit();
  }

  onRedo() {
    this.redo.emit();
  }

  onShow() {
    this.showCompleated.emit();
  }

  onHide() {
    this.hideCompleated.emit();
  }
}
