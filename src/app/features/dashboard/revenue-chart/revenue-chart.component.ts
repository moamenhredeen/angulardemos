import { Component, input } from '@angular/core';

@Component({
  selector: 'app-revenue-chart',
  imports: [],
  templateUrl: './revenue-chart.component.html',
})
export class RevenueChartComponent {
  color = input.required<string>();
}
