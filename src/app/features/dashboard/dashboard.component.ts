import { Component, ElementRef, inject, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RevenueChartComponent } from './revenue-chart/revenue-chart.component';
import {
  GridstackComponent,
  GridstackItemComponent,
  NgGridStackOptions,
  NgGridStackWidget,
} from 'gridstack/dist/angular';
import { GridStack } from 'gridstack';
import { NgFor, NgIf } from '@angular/common';

interface CustomWidget extends NgGridStackWidget {
  color?: string;
  content: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [GridstackComponent, GridstackItemComponent, RevenueChartComponent, NgIf, NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit {
  @ViewChild(GridstackComponent) gridstack?: GridstackComponent;
  
  widgets: CustomWidget[] = [
    { x: 0, y: 0, w: 4, h: 4, id: 'revenue-1', content: 'revenue-chart', color: 'bg-amber-400' },
    { x: 4, y: 0, w: 4, h: 4, id: 'revenue-2', content: 'revenue-chart', color: 'bg-blue-400' }
  ];

  options: NgGridStackOptions = {
    margin: 10,
    draggable: { handle: '.grid-stack-item-content' },
    resizable: { handles: 'all' },
    animate: true,
    cellHeight: 50,
    column: 12,
    minRow: 1,
    float: true,
    removable: true,
    // Save grid changes to localStorage
    onChange: () => this.saveGrid()
  };

  ngOnInit() {
    // Load saved layout if exists
    const savedLayout = localStorage.getItem('gridstack-layout');
    if (savedLayout) {
      this.widgets = JSON.parse(savedLayout);
    }
  }

  ngAfterViewInit() {
    // Initialize grid with saved layout
    if (this.gridstack?.grid) {
      this.gridstack.grid.load(this.widgets);
    }
  }

  addWidget(type: string) {
    const newWidget: CustomWidget = {
      x: 0,
      y: 0,
      w: 4,
      h: 4,
      id: `widget-${Date.now()}`,
      content: type,
      color: this.getRandomColor()
    };
    
    if (this.gridstack?.grid) {
      this.gridstack.grid.addWidget(newWidget);
      this.widgets.push(newWidget);
    }
  }

  removeWidget(widget: CustomWidget) {
    const index = this.widgets.findIndex(w => w.id === widget.id);
    if (index > -1 && this.gridstack?.grid) {
      this.widgets.splice(index, 1);
      this.gridstack.grid.removeWidget(widget.id);
    }
  }

  private saveGrid() {
    const items = this.gridstack?.grid?.save();
    if (items) {
      localStorage.setItem('gridstack-layout', JSON.stringify(items));
    }
  }

  private getRandomColor(): string {
    const colors = ['bg-amber-400', 'bg-blue-400', 'bg-green-400', 'bg-red-400', 'bg-purple-400'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
