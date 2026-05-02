import { ModuleLink } from '@core/models/module.model';
import { homeRoutes } from './home.route';

describe('homeRoutes', () => {
    it('defines the expected redirect and child routes', async () => {
        expect(homeRoutes[0]).toEqual({
            path: '',
            pathMatch: 'full',
            redirectTo: ModuleLink.Introduction,
        });

        expect(homeRoutes[1].path).toBe(ModuleLink.Curriculum);
        expect(homeRoutes[2].path).toBe(ModuleLink.Introduction);

        const curriculumComponent = (await homeRoutes[1].loadComponent?.()) as { name?: string };
        const introductionComponent = (await homeRoutes[2].loadComponent?.()) as { name?: string };

        expect(curriculumComponent.name).toBe('CurriculumContainer');
        expect(introductionComponent.name).toBe('IntroductionComponent');
    });
});
