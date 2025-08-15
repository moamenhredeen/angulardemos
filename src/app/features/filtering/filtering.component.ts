import { CdkTableModule } from '@angular/cdk/table';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { debounceTime } from 'rxjs';
import { TaskDataSource } from './task-data-source';


@Component({
  selector: 'app-filtering',
  imports: [
    CdkTableModule,
    ReactiveFormsModule
  ],
  templateUrl: './filtering.component.html',
})
export class FilteringComponent {

  dataSource = inject(TaskDataSource);

  searchInput = new FormControl<string>('')
  dateInput = new FormControl<Date>(new Date()) 

  displayedColumns: string[] = ['content', 'priority', 'labels', 'status']
  
  
  constructor() {
    // Watch for search input changes and apply filter
    this.searchInput.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.dataSource.applyFilter(value || '');
    });
  }
  
  // Method to handle column sorting
  onSortChange(sortState: {active: string, direction: 'asc' | 'desc'}): void {
    this.dataSource.applySort(sortState);
  }
  
  // Method to manually apply filter
  applyFilter(filterValue: string): void {
    this.dataSource.applyFilter(filterValue);
  }
  
  // Method to refresh data
  refreshData(): void {
    this.dataSource.refresh();
  }
}
