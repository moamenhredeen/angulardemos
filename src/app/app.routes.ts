import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: "home",
    loadComponent: () => import("./features/home/home.component").then(c => c.HomeComponent),
  },
  {
    path: "blog",
    loadComponent: () => import("./features/blog/blog.component").then(c => c.BlogComponent),
  },
  {
    path: "blog/:id",
    loadComponent: () => import("./features/blog/post-details/post-details.component").then(c => c.PostDetailsComponent),
  },
  {
    path: "todo",
    loadComponent: () => import("./features/todo-list/todo-list.component").then(c => c.TodoListComponent),
  },
  {
    path: "dashboard",
    loadComponent: () => import("./features/dashboard/dashboard.component").then(c => c.DashboardComponent),
  },
  {
    path: "about",
    loadComponent: () => import("./features/about/about.component").then(c => c.AboutComponent),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full" // TODO: why
  }
];
