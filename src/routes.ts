import { Routes } from '@angular/router';
import { ModuleLink } from '@core/models/module.model';

// Route configuration for standalone router
export const routes: Routes = [
    {
        path: ModuleLink.Home,
        loadComponent: () => import('@core/home/home.component').then((m) => m.HomeComponent),
        loadChildren: () => import('@core/routes/home.route').then((m) => m.homeRoutes),
    },
];
