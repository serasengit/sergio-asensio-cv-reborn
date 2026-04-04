import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { DeviceType, Language } from '@app/app.component';
import { hideSidenav, setLanguage, setLeftModule, setTopModule, showSidenav } from '@app/store/actions/app.actions';
import {
    getDeviceType,
    getTopModules,
    showSidenav as getShowSidenav,
    getLeftModules,
    getTopModule,
} from '@app/store/selectors/app.selectors';
import { Module, ModuleCode } from '@core/models/module.model';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, Subject, takeUntil } from 'rxjs';
import { AppState } from '../../store/reducers/app.reducers';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    standalone: false
})
export class SidenavComponent implements OnDestroy {
    @ViewChild(MatSidenav) sidenav?: MatSidenav;
    readonly deviceType$ = this.appStore.pipe(select(getDeviceType));
    readonly showSidenav$ = this.appStore.pipe(select(getShowSidenav));
    readonly topModules$ = this.appStore.pipe(select(getTopModules));
    readonly topModule$ = this.appStore.pipe(select(getTopModule));
    readonly leftModules$ = this.appStore.pipe(select(getLeftModules));
    readonly DeviceType = DeviceType;
    readonly params$ = combineLatest([this.deviceType$, this.topModules$, this.topModule$, this.leftModules$, this.showSidenav$]).pipe(
        map(([deviceType, topModules, topModule, leftModules, showSidenav]) => {
            return { deviceType, topModules, topModule, leftModules, showSidenav };
        })
    );
    private readonly unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private readonly appStore: Store<AppState>, private readonly router: Router) {
        this.onRouterChanged();
    }

    setTopModule(module: Module): void {
        this.appStore.dispatch(setTopModule({ module }));
    }

    setLeftModule(module: Module): void {
        this.appStore.dispatch(setLeftModule({ module }));
    }

    onSidenavToggle(isToggled: boolean): void {
        isToggled ? this.showSidenav() : this.hideSidenav();
    }

    private onRouterChanged(): void {
        combineLatest([this.router.events.pipe(filter((event) => event instanceof NavigationEnd)), this.topModules$])
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(([event, topModules]) => {
                const url: string = (event as NavigationEnd).url;
                const module: Module | undefined = topModules.find((module) => url.includes(module.code));
                const isNavigatorRefreshing: boolean = (event as NavigationEnd).id === 1;
                this.setTopModule(module);
                this.existSidenav(module) && !isNavigatorRefreshing ? this.showSidenav() : this.hideSidenav();
            });
    }

    setLanguage(language: Language): void {
        this.appStore.dispatch(setLanguage({ language }));
    }

    public existSidenav(module: Module): boolean {
        return module?.code === ModuleCode.Curriculum;
    }

    public showSidenav(): void {
        this.appStore.dispatch(showSidenav());
    }

    public hideSidenav(): void {
        this.appStore.dispatch(hideSidenav());
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
