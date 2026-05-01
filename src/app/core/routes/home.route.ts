import { Route } from '@angular/router';
import { ModuleLink } from '@core/models/module.model';

export const homeRoutes: Route[] = [
    // Redirect empty path to introduction
    {
        path: '',
        pathMatch: 'full',
        redirectTo: ModuleLink.Introduction,
    },
    // Match curriculum route
    {
        path: ModuleLink.Curriculum,
        loadComponent: () => import('@features/curriculum/curriculum.container').then((m) => m.CurriculumContainer),
    },
    // Match introduction route
    {
        path: ModuleLink.Introduction,
        loadComponent: () => import('@features/introduction/introduction.component').then((m) => m.IntroductionComponent),
    },
];
