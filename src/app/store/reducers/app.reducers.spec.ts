import { DEFAULT_LANGUAGE } from '@app/app.component';
import { DeviceType } from '@core/models/device-type.model';
import { ModuleCode, ModuleLink } from '@core/models/module.model';
import {
    hideSidenav,
    hideSpinner,
    purge,
    setDeviceType,
    setLanguage,
    setLeftModule,
    setLeftModules,
    setTopModule,
    setTopModules,
    showSidenav,
    showSpinner,
} from '../actions/app.actions';
import { appReducer } from './app.reducers';

describe('appReducer', () => {
    it('returns the initial state', () => {
        const state = appReducer(undefined, { type: '@@init' } as never);

        expect(state.showSpinner).toBeFalse();
        expect(state.showSidenav).toBeFalse();
        expect(state.language).toBe(DEFAULT_LANGUAGE);
        expect(state.topModules).toEqual([
            { code: ModuleCode.Introduction, link: ModuleLink.Introduction, icon: 'person' },
            { code: ModuleCode.Curriculum, link: ModuleLink.Curriculum, icon: 'description' },
            { code: ModuleCode.PersonalProjects, link: ModuleLink.PersonalProjects, icon: 'rocket_launch' },
        ]);
    });

    it('updates state for device, spinner, sidenav, and language actions', () => {
        let state = appReducer(undefined, setDeviceType({ deviceType: DeviceType.Large }));
        state = appReducer(state, showSpinner());
        state = appReducer(state, showSidenav());
        state = appReducer(state, setLanguage({ language: 'en' as never }));

        expect(state.deviceType).toBe(DeviceType.Large);
        expect(state.showSpinner).toBeTrue();
        expect(state.showSidenav).toBeTrue();
        expect(state.language).toBe('en');

        state = appReducer(state, hideSpinner());
        state = appReducer(state, hideSidenav());

        expect(state.showSpinner).toBeFalse();
        expect(state.showSidenav).toBeFalse();
    });

    it('updates top and left module state', () => {
        const topModule = { code: ModuleCode.Introduction, link: ModuleLink.Introduction };
        const leftModule = { code: ModuleCode.Profile, link: ModuleLink.Profile };
        const leftModules = [leftModule];

        let state = appReducer(undefined, setTopModule({ module: topModule }));
        state = appReducer(state, setTopModules({ modules: [topModule] }));
        state = appReducer(state, setLeftModule({ module: leftModule }));
        state = appReducer(state, setLeftModules({ modules: leftModules }));

        expect(state.topModule).toEqual(topModule);
        expect(state.topModules).toEqual([topModule]);
        expect(state.leftModule).toEqual(leftModule);
        expect(state.leftModules).toEqual(leftModules);
    });

    it('purges to the initial state', () => {
        const modifiedState = appReducer(undefined, showSpinner());
        const purgedState = appReducer(modifiedState, purge());

        expect(purgedState).toEqual(appReducer(undefined, { type: '@@init' } as never));
    });
});
