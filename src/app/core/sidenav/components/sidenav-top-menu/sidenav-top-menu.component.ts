import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeviceType, Language } from '@app/app.component';
import { Module } from '@core/models/module.model';

@Component({
    selector: 'app-sidenav-top-menu',
    templateUrl: './sidenav-top-menu.component.html',
    styleUrls: ['./sidenav-top-menu.component.scss'],
    standalone: false
})
export class SidenavTopMenuComponent {
    @Output() toggleSidenav = new EventEmitter<void>();
    @Output() changeLanguage = new EventEmitter<Language>();
    @Output() changeModule = new EventEmitter<Module>();
    @Input() existSidenav: boolean;
    @Input() deviceType: DeviceType;
    @Input() modules: Module[];
    readonly Language = Language;
    readonly DeviceType = DeviceType;
}
