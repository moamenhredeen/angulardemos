import { Component } from '@angular/core';
import { CdkTableModule, DataSource } from '@angular/cdk/table'
import { RouterLink } from '@angular/router';

type Demo = {
  title: string
  description: string
  status: 'InProgress' | 'Done'
  url: string[]
}

@Component({
  templateUrl: './home.component.html',
  imports: [
    CdkTableModule,
    RouterLink
  ]
})
export class HomeComponent {
  displayedColumns: string[] = ['title', 'description', 'status'];

  data: Demo[] = [
    {
      title: "Filtering",
      description: "Advanced fitlering techniques using Table Datasource",
      status: "InProgress",
      url: ['/filtering']
    },
    {
      title: "Signals",
      description: "Experminting with Angular Signals",
      status: "Done",
      url: ['/blog']
    },
  ]
}
