import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { DeviceType, Language } from '@app/app.component';
import { setLanguage, setModule } from '@app/store/actions/app.actions';
import { getDeviceType } from '@app/store/selectors/app.selectors';
import { Module } from '@core/models/module.model';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, Subject, takeUntil } from 'rxjs';

import { AppState } from '../../store/reducers/app.reducers';
import { MODULES } from './components/sidenav-left-menu/sidenav-left-menu.component';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnDestroy {
    @ViewChild(MatSidenav) sidenav?: MatSidenav;
    readonly deviceType$ = this.appStore.pipe(select(getDeviceType));
    readonly DeviceType = DeviceType;
    readonly params$ = combineLatest([this.deviceType$]).pipe(
        map(([deviceType]) => {
            return { deviceType };
        })
    );
    private readonly unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private readonly appStore: Store<AppState>, private readonly router: Router) {
        this.onRouterChanged();
    }

    setModule(module: Module): void {
        this.appStore.dispatch(setModule({ module }));
    }

    toggleSidenav(): void {
        this.sidenav?.toggle();
    }

    private onRouterChanged(): void {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this.unsubscribe$)
            )
            .subscribe((event: any) => {
                const url: string = event['url'];
                const module: Module = MODULES.find((module) => url.includes(module.code));
                this.setModule(module);
            });
    }

    setLanguage(language: Language): void {
        this.appStore.dispatch(setLanguage({ language }));
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
