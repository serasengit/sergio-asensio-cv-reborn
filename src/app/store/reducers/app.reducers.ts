import { DEFAULT_LANGUAGE, Language } from '@app/app.component';
import { DeviceType, getDevice } from '@core/models/device-type.model';
import { Module, ModuleCode, ModuleLink } from '@core/models/module.model';
import { createReducer, on } from '@ngrx/store';
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

export interface AppState {
    deviceType: DeviceType;
    showSpinner: boolean;
    showSidenav: boolean;
    language: Language;
    topModules: Module[];
    topModule: Module;
    leftModules: Module[];
    leftModule: Module;
}

const initialState: AppState = {
    deviceType: getDevice(window.innerWidth),
    showSpinner: false,
    showSidenav: false,
    language: DEFAULT_LANGUAGE,
    topModules: [
        {
            code: ModuleCode.Introduction,
            link: ModuleLink.Introduction,
            icon: 'person',
        },
        {
            code: ModuleCode.Curriculum,
            link: ModuleLink.Curriculum,
            icon: 'description',
        },
        {
            code: ModuleCode.PersonalProjects,
            link: ModuleLink.PersonalProjects,
            icon: 'rocket_launch',
        },
    ],
    topModule: null,
    leftModules: [],
    leftModule: null,
};
export const appReducer = createReducer(
    initialState,
    on(setDeviceType, (state, action) => ({
        ...state,
        deviceType: action.deviceType,
    })),
    on(showSpinner, (state) => ({
        ...state,
        showSpinner: true,
    })),
    on(hideSpinner, (state) => ({
        ...state,
        showSpinner: false,
    })),
    on(showSidenav, (state) => ({
        ...state,
        showSidenav: true,
    })),
    on(hideSidenav, (state) => ({
        ...state,
        showSidenav: false,
    })),
    on(setLanguage, (state, action) => ({
        ...state,
        language: action.language,
    })),
    on(setTopModules, (state, action) => ({
        ...state,
        topModules: action.modules,
    })),
    on(setTopModule, (state, action) => ({
        ...state,
        topModule: { ...action.module },
    })),
    on(setLeftModules, (state, action) => ({
        ...state,
        leftModules: action.modules,
    })),
    on(setLeftModule, (state, action) => ({
        ...state,
        leftModule: { ...action.module },
    })),
    on(purge, () => ({
        ...initialState,
    }))
);
