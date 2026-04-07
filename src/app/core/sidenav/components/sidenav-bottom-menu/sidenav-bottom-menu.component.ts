import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DeviceType } from '@core/models/device-type.model';
import { VERSION } from '@core/tokens/version.token';

@Component({
    selector: 'app-sidenav-bottom-menu',
    standalone: true,
    templateUrl: './sidenav-bottom-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavBottomMenuComponent {
    readonly appVersion = inject(VERSION);

    readonly deviceType = input<DeviceType>();

    readonly logoHeight = computed(() => {
        switch (this.deviceType()) {
            case DeviceType.ExtraSmall:
            case DeviceType.Small:
            case DeviceType.Medium:
                return 20;
            case DeviceType.MediumLarge:
                return 25;
            case DeviceType.Large:
                return 35;
            default:
                return 40;
        }
    });
}
