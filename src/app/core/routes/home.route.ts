import { Route } from '@angular/router';
import { ModuleLink } from '@core/models/module.model';

export const homeRoutes: Route[] = [
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
