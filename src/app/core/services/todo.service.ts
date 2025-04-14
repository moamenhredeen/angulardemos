import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoItem} from '$core/types/todo';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly baseUrl = "https://jsonplaceholder.typicode.com/todos";

  private _todosSubject = new BehaviorSubject<TodoItem[]>([]);


  private _http = inject(HttpClient);

  get todos$(): Observable<TodoItem[]> {
    return this._todosSubject.asObservable();
  }

  getTodos() {
    this._http.get<TodoItem[]>(`${this.baseUrl}`)
      .subscribe({
        next: value => {
          this._todosSubject.next(value);
        }
      });
  }

  update(item: {id: number; completed: boolean}) {
    this._http.patch<TodoItem>(`${this.baseUrl}/${item.id}`, item)
      .subscribe({
        next: value => {
          const arr = [...this._todosSubject.value];
          const index = arr.findIndex(e => e.id === item.id);
          arr[index] = value;
          this._todosSubject.next(arr)
        }
      })
  }
}
