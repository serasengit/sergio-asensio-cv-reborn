import { Component, inject } from '@angular/core';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { Language } from '@app/app.component';
import { hideSidenav, setLanguage, setLeftModule, setTopModule, showSidenav } from '@app/store/actions/app.actions';
import {
    getDeviceType,
    getLeftModule,
    getLeftModules,
    showSidenav as getShowSidenav,
    getTopModule,
    getTopModules,
} from '@app/store/selectors/app.selectors';
import { DeviceType } from '@core/models/device-type.model';
import { Module, ModuleCode } from '@core/models/module.model';
import { VERSION } from '@core/tokens/version.token';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppState } from '../../store/reducers/app.reducers';
import { SidenavBottomMenuComponent } from './components/sidenav-bottom-menu/sidenav-bottom-menu.component';
import { SidenavLeftMenuComponent } from './components/sidenav-left-menu/sidenav-left-menu.component';
import { SidenavTopMenuComponent } from './components/sidenav-top-menu/sidenav-top-menu.component';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [
        MatSidenavModule,
        MatToolbarModule,
        TranslateModule,
        SidenavBottomMenuComponent,
        SidenavTopMenuComponent,
        SidenavLeftMenuComponent,
        RouterOutlet,
    ],
    templateUrl: './sidenav.container.html',
    styleUrls: ['./sidenav.container.scss'],
})
export class SidenavContainer {
    readonly DeviceType = DeviceType;

    private readonly appStore = inject(Store<AppState>);
    private readonly router = inject(Router);
    readonly appVersion = inject(VERSION);
    readonly mustShowSidenav = this.appStore.selectSignal(getShowSidenav);
    readonly topModule = this.appStore.selectSignal(getTopModule);
    readonly topModules = this.appStore.selectSignal(getTopModules);
    readonly leftModule = this.appStore.selectSignal(getLeftModule);
    readonly leftModules = this.appStore.selectSignal(getLeftModules);
    readonly deviceType = this.appStore.selectSignal(getDeviceType);

    public handleTopModuleChange(module: Module): void {
        this.appStore.dispatch(setTopModule({ module }));
        this.router.navigate([module.link]);
        if ([ModuleCode.Curriculum].includes(module.code) && this.deviceType() !== DeviceType.ExtraSmall) this.showSidenav();
        else this.hideSidenav();
    }
    public setLeftModule(module: Module): void {
        this.appStore.dispatch(setLeftModule({ module }));
    }

    public onSidenavToggle(isToggled: boolean): void {
        if (isToggled) this.showSidenav();
        else this.hideSidenav();
    }

    public showSidenav(): void {
        this.appStore.dispatch(showSidenav());
    }

    public hideSidenav(): void {
        this.appStore.dispatch(hideSidenav());
    }

    public get sidenavMode(): MatDrawerMode {
        return this.deviceType() === DeviceType.ExtraSmall ? 'over' : 'side';
    }

    public setLanguage(language: Language): void {
        this.appStore.dispatch(setLanguage({ language }));
    }
}
