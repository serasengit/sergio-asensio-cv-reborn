import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Language } from '@app/app.component';
import { DeviceType } from '@core/models/device-type.model';
import { ModuleCode, ModuleLink } from '@core/models/module.model';
import { SidenavTopMenuComponent } from './sidenav-top-menu.component';

describe('SidenavTopMenuComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SidenavTopMenuComponent, TranslateModule.forRoot()],
        }).compileComponents();
    });

    it('detects active and nested modules', () => {
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
        expect(fixture.componentInstance.isMobileLayout()).toBeFalse();

        fixture.componentRef.setInput('activeModule', { code: ModuleCode.Curriculum, link: ModuleLink.Curriculum });
        fixture.componentRef.setInput('deviceType', DeviceType.Small);
        fixture.detectChanges();

        expect(fixture.componentInstance.mustShowTitle()).toBeFalse();
        expect(fixture.componentInstance.mustShowMenuButton()).toBeTrue();
        expect(fixture.componentInstance.isMobileLayout()).toBeTrue();
        expect(fixture.componentInstance.Language).toBe(Language);
    });

    it('renders desktop social links and hides mobile-only actions on large screens', () => {
        const fixture = TestBed.createComponent(SidenavTopMenuComponent);
        fixture.componentRef.setInput('deviceType', DeviceType.Large);
        fixture.componentRef.setInput('activeModule', { code: ModuleCode.Introduction, link: ModuleLink.Introduction, icon: 'person' });
        fixture.componentRef.setInput('modules', [{ code: ModuleCode.Introduction, link: ModuleLink.Introduction, icon: 'person' }]);
        fixture.detectChanges();

        const host: HTMLElement = fixture.nativeElement;
        const links = Array.from(host.querySelectorAll<HTMLAnchorElement>('a[mat-icon-button]')).map((link) => link.getAttribute('href'));
        const icons = Array.from(host.querySelectorAll('mat-icon')).map((icon) => icon.textContent?.trim());

        expect(links).toContain('https://www.linkedin.com/in/sergio-asensio-puyuelo-aa9916117/');
        expect(links).toContain('https://mail.google.com/mail/u/0/?view=cm&fs=1&to=maserasen@gmail.com&tf=1');
        expect(links).toContain('https://github.com/serasengit');
        expect(icons).not.toContain('more_vert');
    });

    it('renders the compact mobile layout with a module trigger and overflow menu', () => {
        const fixture = TestBed.createComponent(SidenavTopMenuComponent);
        fixture.componentRef.setInput('deviceType', DeviceType.ExtraSmall);
        fixture.componentRef.setInput('activeModule', {
            code: ModuleCode.Curriculum,
            link: ModuleLink.Curriculum,
            icon: 'description',
        });
        fixture.componentRef.setInput('modules', [
            { code: ModuleCode.Introduction, link: ModuleLink.Introduction, icon: 'person' },
            { code: ModuleCode.Curriculum, link: ModuleLink.Curriculum, icon: 'description' },
            { code: ModuleCode.PersonalProjects, link: ModuleLink.PersonalProjects, icon: 'rocket_launch' },
        ]);
        fixture.detectChanges();

        const host: HTMLElement = fixture.nativeElement;
        const mobileTrigger = host.querySelector('.sidenav-top-menu__toolbar__sections__left__mobile-trigger');
        const links = Array.from(host.querySelectorAll<HTMLAnchorElement>('a[mat-icon-button]')).map((link) => link.getAttribute('href'));
        const icons = Array.from(host.querySelectorAll('mat-icon')).map((icon) => icon.textContent?.trim());
        const leftButtons = host.querySelectorAll('nav button[mat-icon-button]');

        expect(mobileTrigger).not.toBeNull();
        expect(leftButtons.length).toBe(1);
        expect(links).toEqual(['https://github.com/serasengit']);
        expect(icons).toContain('more_vert');
        expect(icons).toContain('settings');
        expect(host.textContent).toContain('curriculum');
    });

    it('shows the toolbar menu button only for curriculum', () => {
        const fixture = TestBed.createComponent(SidenavTopMenuComponent);
        fixture.componentRef.setInput('deviceType', DeviceType.Small);
        fixture.componentRef.setInput('modules', [{ code: ModuleCode.Introduction, link: ModuleLink.Introduction, icon: 'person' }]);

        fixture.componentRef.setInput('activeModule', { code: ModuleCode.Introduction, link: ModuleLink.Introduction, icon: 'person' });
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.sidenav-top-menu__toolbar__menu')).toBeNull();

        fixture.componentRef.setInput('activeModule', { code: ModuleCode.Curriculum, link: ModuleLink.Curriculum, icon: 'description' });
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.sidenav-top-menu__toolbar__menu')).not.toBeNull();
    });
});
