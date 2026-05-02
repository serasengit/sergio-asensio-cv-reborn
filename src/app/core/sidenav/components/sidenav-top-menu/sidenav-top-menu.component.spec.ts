import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Language } from '@app/app.component';
import { DeviceType } from '@core/models/device-type.model';
import { ModuleCode, ModuleLink } from '@core/models/module.model';
import { SidenavTopMenuComponent } from './sidenav-top-menu.component';

describe('SidenavTopMenuComponent', () => {
    it('detects active and nested modules', async () => {
        await TestBed.configureTestingModule({
            imports: [SidenavTopMenuComponent, TranslateModule.forRoot()],
        }).compileComponents();

        const fixture = TestBed.createComponent(SidenavTopMenuComponent);
        const activeModule = { code: ModuleCode.Profile, link: ModuleLink.Profile };
        const module = { code: ModuleCode.Curriculum, modules: [activeModule] };

        fixture.componentRef.setInput('activeModule', activeModule);
        fixture.componentRef.setInput('modules', [module]);
        fixture.componentRef.setInput('deviceType', DeviceType.Large);
        fixture.detectChanges();

        expect(fixture.componentInstance.isModuleInModule(activeModule)).toBeTrue();
        expect(fixture.componentInstance.isModuleInModule(module)).toBeTrue();
        expect(fixture.componentInstance.mustShowTitle()).toBeTrue();
        expect(fixture.componentInstance.mustShowMenuButton()).toBeFalse();

        fixture.componentRef.setInput('activeModule', { code: ModuleCode.Curriculum, link: ModuleLink.Curriculum });
        fixture.componentRef.setInput('deviceType', DeviceType.Small);
        fixture.detectChanges();

        expect(fixture.componentInstance.mustShowTitle()).toBeFalse();
        expect(fixture.componentInstance.mustShowMenuButton()).toBeTrue();
        expect(fixture.componentInstance.Language).toBe(Language);
    });
});
