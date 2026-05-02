import { Language } from '@app/app.component';
import { DeviceType } from '@core/models/device-type.model';
import { ModuleCode } from '@core/models/module.model';
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
} from './app.actions';

describe('app.actions', () => {
    it('creates the expected device type action', () => {
        expect(setDeviceType({ deviceType: DeviceType.Medium })).toEqual({
            type: '[App] Set Device Type',
            deviceType: DeviceType.Medium,
        });
    });

    it('creates the expected language action', () => {
        expect(setLanguage({ language: Language.English })).toEqual({
            type: '[App] Set language',
            language: Language.English,
        });
    });

    it('creates the expected module actions', () => {
        const module = { code: ModuleCode.Curriculum };
        const modules = [module];

        expect(setTopModule({ module })).toEqual({ type: '[App] Set top module', module });
        expect(setTopModules({ modules })).toEqual({ type: '[App] Set top modules', modules });
        expect(setLeftModule({ module })).toEqual({ type: '[App] Set left module', module });
        expect(setLeftModules({ modules })).toEqual({ type: '[App] Set left modules', modules });
    });

    it('creates the expected simple actions', () => {
        expect(showSpinner().type).toBe('[App] Show spinner');
        expect(hideSpinner().type).toBe('[App] Hide spinner');
        expect(showSidenav().type).toBe('[App] Show sidenav');
        expect(hideSidenav().type).toBe('[App] Hide sidenav');
        expect(purge().type).toBe('[App] Purge');
    });
});
