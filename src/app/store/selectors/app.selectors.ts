import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/app.reducers';

export const selectApp = createFeatureSelector<AppState>('app');

export const getDeviceType = createSelector(selectApp, (state) => state.deviceType);

export const showSpinner = createSelector(selectApp, (state) => state.showSpinner);

export const showSidenav = createSelector(selectApp, (state) => state.showSidenav);

export const getLanguage = createSelector(selectApp, (state) => state.language);

export const getTopModules = createSelector(selectApp, (state) => state.topModules);

export const getTopModule = createSelector(selectApp, (state) => state.topModule);

export const getLeftModules = createSelector(selectApp, (state) => state.leftModules);

export const getLeftModule = createSelector(selectApp, (state) => state.leftModule);
