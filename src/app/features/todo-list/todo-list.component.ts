import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {TodoService} from '$core/services/todo.service';
import {AsyncPipe} from '@angular/common';
import {TodoItemComponent} from './todo-item/todo-item.component';
import {BehaviorSubject} from 'rxjs';
import {TodoItem} from '$core/types/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    TodoItemComponent
  ],
})
export class TodoListComponent implements OnInit{

  private _todoService = inject(TodoService);

  todos$ = this._todoService.todos$;

  ngOnInit() {
    this._todoService.getTodos();
  }

  handleStatusChange($event: {id: number; completed: boolean}) {
    this._todoService.update($event);
  }
}
