import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from '@core/models/module.model';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require('package.json').version;
@Component({
    selector: 'app-sidenav-left-menu',
    templateUrl: './sidenav-left-menu.component.html',
    styleUrls: ['./sidenav-left-menu.component.scss'],
})
export class SidenavLeftMenuComponent {
    @Output() changeModule = new EventEmitter<Module>();
    @Input() modules?: Module[];

    constructor(private readonly router: Router) {}

    get version(): string {
        return version;
    }
}
