import { Component, EventEmitter, Output } from '@angular/core';
import { Language } from '@app/app.component';
import { Module, ModuleCode, ModuleLink } from '@core/models/module.model';
export const MODULES: Module[] = [
    {
        code: ModuleCode.Home,
        link: ModuleLink.Home,
        icon: 'home',
    },
    {
        code: ModuleCode.Curriculum,
        link: ModuleLink.Curriculum,
        icon: 'description',
    },
];
@Component({
    selector: 'app-sidenav-top-menu',
    templateUrl: './sidenav-top-menu.component.html',
    styleUrls: ['./sidenav-top-menu.component.scss'],
})
export class SidenavTopMenuComponent {
    @Output() toggleSidenav = new EventEmitter<void>();
    @Output() changeLanguage = new EventEmitter<Language>();
    @Output() changeModule = new EventEmitter<Module>();
    readonly modules: Module[] = MODULES;
    readonly Language = Language;
}
