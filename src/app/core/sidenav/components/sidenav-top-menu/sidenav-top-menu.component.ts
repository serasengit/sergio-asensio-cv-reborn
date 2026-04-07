import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Language } from '@app/app.component';
import { DeviceType, isDeviceGreaterThan } from '@core/models/device-type.model';
import { Module, ModuleCode } from '@core/models/module.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-sidenav-top-menu',
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule, MatTooltipModule, TranslateModule],
    templateUrl: './sidenav-top-menu.component.html',
    styleUrls: ['./sidenav-top-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavTopMenuComponent {
    readonly deviceType = input<DeviceType>();
    readonly modules = input<Module[]>();
    readonly activeModule = input<Module>();
    readonly toggleSidenav = output<void>();
    readonly changeModule = output<Module>();
    readonly changeLanguage = output<Language>();

    readonly DeviceType = DeviceType;
    readonly ModuleCode = ModuleCode;
    readonly Language = Language;

    public isModuleInModule(module: Module): boolean {
        const activeModule = this.activeModule();
        if (!module || !activeModule) return false;
        if (module.code === activeModule.code) return true;
        return module.modules?.some((sub) => sub.code === activeModule.code) ?? false;
    }

    public readonly mustShowTitle = computed(() => {
        return isDeviceGreaterThan(this.deviceType(), DeviceType.Medium);
    });

    public readonly mustShowMenuButton = computed(() => [ModuleCode.Curriculum].includes(this.activeModule()?.code));
}
