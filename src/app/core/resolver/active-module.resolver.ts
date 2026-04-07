import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { setTopModule } from '@app/store/actions/app.actions';
import { AppState } from '@app/store/reducers/app.reducers';
import { getTopModules } from '@app/store/selectors/app.selectors';
import { findModuleByUrl, Module, ModuleLink } from '@core/models/module.model';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';

export const setActiveModuleResolver: ResolveFn<Module> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const appStore = inject(Store<AppState>);

    const moduleLink = state.url;
    // Route might be empty
    if (!moduleLink) return null;

    return appStore.select(getTopModules).pipe(
        map((modules) => findModuleByUrl(<ModuleLink>moduleLink, modules)),
        tap((module) => {
            appStore.dispatch(setTopModule({ module: { ...module } }));
        })
    );
};
