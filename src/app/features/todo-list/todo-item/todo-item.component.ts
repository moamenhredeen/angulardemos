import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoItem} from '$core/types/todo';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [
    NgClass
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input({required:true}) todo!: TodoItem;

  @Output() statusChangeEvent = new EventEmitter<{id: number, completed: boolean}>();

  toggleStatus(id: number) {
    this.statusChangeEvent.emit({id, completed: !this.todo.completed})
  }
}
