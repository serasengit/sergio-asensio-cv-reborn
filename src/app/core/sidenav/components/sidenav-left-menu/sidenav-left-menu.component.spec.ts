import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ModuleCode, ModuleLink } from '@core/models/module.model';
import { SidenavLeftMenuComponent } from './sidenav-left-menu.component';

describe('SidenavLeftMenuComponent', () => {
    it('chooses the correct template and active state', async () => {
        await TestBed.configureTestingModule({
            imports: [SidenavLeftMenuComponent, TranslateModule.forRoot()],
            providers: [provideRouter([])],
        }).compileComponents();

        const fixture = TestBed.createComponent(SidenavLeftMenuComponent);
        const child = { code: ModuleCode.Profile, link: ModuleLink.Profile };
        const parent = { code: ModuleCode.Curriculum, link: ModuleLink.Curriculum, modules: [child] };

        fixture.componentRef.setInput('activeModule', child);
        fixture.componentRef.setInput('modules', [parent]);
        fixture.detectChanges();

        expect(fixture.componentInstance.getTemplateForModule(parent)).toBe(fixture.componentInstance.expandableModule());
        expect(fixture.componentInstance.getTemplateForModule(child)).toBe(fixture.componentInstance.flatModule());
        expect(fixture.componentInstance.isModuleInModule(parent)).toBeTrue();
        expect(fixture.componentInstance.isModuleInModule(child)).toBeTrue();
    });
});
