import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Module, ModuleCode, ModuleLink } from '@core/models/module.model';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require('package.json').version;
export const MODULES: Module[] = [
    {
        code: ModuleCode.Home,
        link: ModuleLink.Home,
        icon: 'home',
    },
];
@Component({
    selector: 'app-sidenav-left-menu',
    templateUrl: './sidenav-left-menu.component.html',
    styleUrls: ['./sidenav-left-menu.component.scss'],
})
export class SidenavLeftMenuComponent {
    @Output() changeModule = new EventEmitter<Module>();
    readonly modules: Module[] = MODULES;

    constructor(private readonly router: Router) {}

    get version(): string {
        return version;
    }
}
