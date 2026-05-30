import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '@app/app.component';
import { hideSidenav, setLeftModule, setLanguage, setTopModule, showSidenav } from '@app/store/actions/app.actions';
import {
    getDeviceType,
    getLeftModule,
    getLeftModules,
    getTopModule,
    getTopModules,
    showSidenav as getShowSidenav,
} from '@app/store/selectors/app.selectors';
import { DeviceType } from '@core/models/device-type.model';
import { ModuleCode, ModuleLink } from '@core/models/module.model';
import { VERSION } from '@core/tokens/version.token';
import { Store } from '@ngrx/store';
import { SidenavContainer } from './sidenav.container';

describe('SidenavContainer', () => {
    let store: { dispatch: jasmine.Spy; selectSignal: jasmine.Spy };
    let router: jasmine.SpyObj<Router>;
    const deviceTypeSignal = signal(DeviceType.Large);
    const showSidenavSignal = signal(false);
    const topModuleSignal = signal(null);
    const topModulesSignal = signal([]);
    const leftModuleSignal = signal(null);
    const leftModulesSignal = signal([]);

    beforeEach(async () => {
        deviceTypeSignal.set(DeviceType.Large);
        showSidenavSignal.set(false);
        topModuleSignal.set(null);
        topModulesSignal.set([]);
        leftModuleSignal.set(null);
        leftModulesSignal.set([]);

        store = {
            dispatch: jasmine.createSpy('dispatch'),
            selectSignal: jasmine.createSpy('selectSignal').and.callFake((selector: unknown) => {
                if (selector === getDeviceType) return deviceTypeSignal;
                if (selector === getShowSidenav) return showSidenavSignal;
                if (selector === getTopModule) return topModuleSignal;
                if (selector === getTopModules) return topModulesSignal;
                if (selector === getLeftModule) return leftModuleSignal;
                if (selector === getLeftModules) return leftModulesSignal;
                return signal(null);
            }),
        };

        router = jasmine.createSpyObj<Router>('Router', ['navigate']);

        TestBed.overrideComponent(SidenavContainer, {
            set: { template: '' },
        });

        await TestBed.configureTestingModule({
            imports: [SidenavContainer],
            providers: [
                provideRouter([]),
                { provide: Store, useValue: store },
                { provide: Router, useValue: router },
                { provide: VERSION, useValue: '1.0.0' },
                { provide: TranslateService, useValue: jasmine.createSpyObj('TranslateService', ['instant', 'use']) },
            ],
        }).compileComponents();
    });

    it('creates the component', () => {
        const fixture = TestBed.createComponent(SidenavContainer);

        expect(fixture.componentInstance).toBeTruthy();
    });

    it('changes the top module and shows the sidenav for curriculum on non-extra-small devices', () => {
        const fixture = TestBed.createComponent(SidenavContainer);
        const component = fixture.componentInstance;
        const module = { code: ModuleCode.Curriculum, link: ModuleLink.Curriculum };

        component.handleTopModuleChange(module);

        expect(router.navigate).toHaveBeenCalledWith([ModuleLink.Curriculum]);
        expect(store.dispatch).toHaveBeenCalledWith(setTopModule({ module }));
        expect(store.dispatch).toHaveBeenCalledWith(showSidenav());
    });

    it('computes the sidenav mode from the device type', () => {
        const fixture = TestBed.createComponent(SidenavContainer);
        const component = fixture.componentInstance;

        expect(component.sidenavMode).toBe('side');
        deviceTypeSignal.set(DeviceType.ExtraSmall);
        expect(component.sidenavMode).toBe('over');
    });

    it('dispatches the left module change', () => {
        const fixture = TestBed.createComponent(SidenavContainer);
        const component = fixture.componentInstance;
        const module = { code: ModuleCode.Profile, link: ModuleLink.Profile };

        component.setLeftModule(module);

        expect(store.dispatch).toHaveBeenCalledWith(setLeftModule({ module }));
    });

    it('shows or hides the sidenav when toggled', () => {
        const fixture = TestBed.createComponent(SidenavContainer);
        const component = fixture.componentInstance;

        component.onSidenavToggle(true);
        expect(store.dispatch).toHaveBeenCalledWith(showSidenav());

        store.dispatch.calls.reset();

        component.onSidenavToggle(false);
        expect(store.dispatch).toHaveBeenCalledWith(hideSidenav());
    });

    it('dispatches hide sidenav directly', () => {
        const fixture = TestBed.createComponent(SidenavContainer);
        const component = fixture.componentInstance;

        component.hideSidenav();

        expect(store.dispatch).toHaveBeenCalledWith(hideSidenav());
    });

    it('dispatches language changes', () => {
        const fixture = TestBed.createComponent(SidenavContainer);
        const component = fixture.componentInstance;

        component.setLanguage(Language.English);

        expect(store.dispatch).toHaveBeenCalledWith(setLanguage({ language: Language.English }));
    });
});
