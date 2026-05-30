import { ModuleLink } from '@core/models/module.model';
import { setActiveModuleResolver } from '@core/resolver/active-module.resolver';
import { routes } from './routes';

describe('routes', () => {
    it('defines the expected root route', async () => {
        expect(routes).toHaveSize(1);
        expect(routes[0].path).toBe(ModuleLink.Home);
        expect(routes[0].resolve).toEqual([setActiveModuleResolver]);

        const component = (await routes[0].loadComponent?.()) as { name?: string };
        const children = (await routes[0].loadChildren?.()) as unknown[];

        expect(component.name).toBe('HomeComponent');
        expect(children.length).toBe(4);
    });
});
