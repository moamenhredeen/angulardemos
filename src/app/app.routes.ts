import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "home",
        loadComponent: () => import("./features/home/home.component").then(c => c.HomeComponent),
    },
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full" // TODO: why
    }
];
