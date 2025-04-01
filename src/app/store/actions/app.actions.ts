import { Module } from '@core/models/module.model';
import { createAction, props } from '@ngrx/store';
import { DeviceType, Language } from 'src/app/app.component';

export const setDeviceType = createAction('[App] Set Device Type', props<{ deviceType: DeviceType }>());

export const showSpinner = createAction('[App] Show spinner');

export const hideSpinner = createAction('[App] Hide spinner');

export const showSidenav = createAction('[App] Show sidenav');

export const hideSidenav = createAction('[App] Hide sidenav');

export const setLanguage = createAction('[App] Set language', props<{ language: Language }>());

export const setTopModules = createAction('[App] Set top modules', props<{ modules: Module[] }>());

export const setTopModule = createAction('[App] Set top module', props<{ module: Module }>());

export const setLeftModules = createAction('[App] Set left modules', props<{ modules: Module[] }>());

export const setLeftModule = createAction('[App] Set left module', props<{ module: Module }>());

export const purge = createAction('[App] Purge');
