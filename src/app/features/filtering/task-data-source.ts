import { DataSource } from "@angular/cdk/table";
import { inject, Injectable, signal, computed } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { Observable, tap, catchError, of } from "rxjs";
import { Task } from "./types";
import { TodoistService } from "./todoist.service";

@Injectable({
  providedIn: 'root'
})
export class TaskDataSource extends DataSource<Task> {
  private todoistService = inject(TodoistService);
  
  // Signals for state management
  private tasksSignal = signal<Task[]>([]);
  private loadingSignal = signal<boolean>(false);
  private filterSignal = signal<string>('');
  private sortSignal = signal<{active: string, direction: 'asc' | 'desc'}>({active: 'priority', direction: 'asc'});
  
  // Public readonly signals
  public readonly tasks = this.tasksSignal.asReadonly();
  public readonly loading = this.loadingSignal.asReadonly();
  public readonly filter = this.filterSignal.asReadonly();
  public readonly sort = this.sortSignal.asReadonly();
  
  // Observable versions for compatibility with async pipe and CDK Table
  public readonly loading$ = toObservable(this.loading);
  public readonly filter$ = toObservable(this.filter);
  public readonly sort$ = toObservable(this.sort);
  
  // Computed signal for additional derived state if needed
  public readonly hasFilter = computed(() => this.filter().length > 0);
  public readonly taskCount = computed(() => this.tasks().length);
  
  constructor() {
    super();
    this.loadInitialData();
  }
  
  connect(): Observable<Task[]> {
    return toObservable(this.tasks);
  }
  
  private loadInitialData(): void {
    this.refreshData();
  }
  
  private refreshData(): void {
    this.loadingSignal.set(true);
    
    const currentFilter = this.filter();
    const currentSort = this.sort();
    
    this.todoistService.filterTasks(currentFilter, currentSort.active, currentSort.direction)
      .pipe(
        tap(() => this.loadingSignal.set(false)),
        catchError(error => {
          console.error('Error loading tasks:', error);
          this.loadingSignal.set(false);
          return of({ results: [], next_cursor: '' });
        })
      )
      .subscribe(response => {
        this.tasksSignal.set(response.results || []);
      });
  }
  
  // Server-side filtering method
  applyFilter(filterValue: string): void {
    if (this.filter() !== filterValue) {
      this.filterSignal.set(filterValue);
      this.refreshData();
    }
  }
  
  // Server-side sorting method
  applySort(sortState: {active: string, direction: 'asc' | 'desc'}): void {
    const currentSort = this.sort();
    if (currentSort.active !== sortState.active || currentSort.direction !== sortState.direction) {
      this.sortSignal.set(sortState);
      this.refreshData();
    }
  }
  
  // Get current filter value (using signal)
  getCurrentFilter(): string {
    return this.filter();
  }
  
  // Get current sort state (using signal)
  getCurrentSort(): {active: string, direction: 'asc' | 'desc'} {
    return this.sort();
  }
  
  // Manual refresh method
  refresh(): void {
    this.refreshData();
  }
  
  disconnect(): void {
    // Signals don't need cleanup like BehaviorSubjects
    // The framework handles signal cleanup automatically
  }
}