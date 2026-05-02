import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '@app/app.component';
import { DeviceType } from '@core/models/device-type.model';
import { ModuleCode, ModuleLink } from '@core/models/module.model';
import { VERSION } from '@core/tokens/version.token';
import { Store } from '@ngrx/store';
import { SidenavContainer } from './sidenav.container';

describe('SidenavContainer', () => {
    let store: { dispatch: jasmine.Spy; selectSignal: jasmine.Spy };
    let router: jasmine.SpyObj<Router>;
    const deviceTypeSignal = signal(DeviceType.Large);

    beforeEach(async () => {
        store = {
            dispatch: jasmine.createSpy('dispatch'),
            selectSignal: jasmine.createSpy('selectSignal').and.callFake(() => deviceTypeSignal),
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
        expect(store.dispatch).toHaveBeenCalled();
    });

    it('computes the sidenav mode from the device type', () => {
        const fixture = TestBed.createComponent(SidenavContainer);
        const component = fixture.componentInstance;

        expect(component.sidenavMode).toBe('side');
        deviceTypeSignal.set(DeviceType.ExtraSmall);
        expect(component.sidenavMode).toBe('over');
    });

    it('dispatches language changes', () => {
        const fixture = TestBed.createComponent(SidenavContainer);
        const component = fixture.componentInstance;

        component.setLanguage(Language.English);

        expect(store.dispatch).toHaveBeenCalled();
    });
});
