import { DeviceType } from '@core/models/device-type.model';
import { ModuleCode } from '@core/models/module.model';
import {
    getDeviceType,
    getLanguage,
    getLeftModule,
    getLeftModules,
    getTopModule,
    getTopModules,
    selectApp,
    showSidenav,
    showSpinner,
} from './app.selectors';

describe('app.selectors', () => {
    const appState = {
        deviceType: DeviceType.Medium,
        showSpinner: true,
        showSidenav: false,
        language: 'es',
        topModules: [{ code: ModuleCode.Introduction }],
        topModule: { code: ModuleCode.Introduction },
        leftModules: [{ code: ModuleCode.Profile }],
        leftModule: { code: ModuleCode.Profile },
    };
    const state = { app: appState };

    it('selects the app slice', () => {
        expect(selectApp(state as never)).toEqual(appState as never);
    });

    it('selects primitive fields', () => {
        expect(getDeviceType(state as never)).toBe(DeviceType.Medium);
        expect(showSpinner(state as never)).toBeTrue();
        expect(showSidenav(state as never)).toBeFalse();
        expect(getLanguage(state as never)).toBe('es');
    });

    it('selects module state', () => {
        expect(getTopModules(state as never)).toEqual(appState.topModules as never);
        expect(getTopModule(state as never)).toEqual(appState.topModule as never);
        expect(getLeftModules(state as never)).toEqual(appState.leftModules as never);
        expect(getLeftModule(state as never)).toEqual(appState.leftModule as never);
    });
});
