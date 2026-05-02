import { TestBed } from '@angular/core/testing';
import { DeviceType } from '@core/models/device-type.model';
import { VERSION } from '@core/tokens/version.token';
import { SidenavBottomMenuComponent } from './sidenav-bottom-menu.component';

describe('SidenavBottomMenuComponent', () => {
    it('computes logo height from the device type', async () => {
        await TestBed.configureTestingModule({
            imports: [SidenavBottomMenuComponent],
            providers: [{ provide: VERSION, useValue: '1.0.0' }],
        }).compileComponents();

        const fixture = TestBed.createComponent(SidenavBottomMenuComponent);
        fixture.componentRef.setInput('deviceType', DeviceType.ExtraSmall);
        fixture.detectChanges();
        expect(fixture.componentInstance.logoHeight()).toBe(20);

        fixture.componentRef.setInput('deviceType', DeviceType.MediumLarge);
        fixture.detectChanges();
        expect(fixture.componentInstance.logoHeight()).toBe(25);

        fixture.componentRef.setInput('deviceType', DeviceType.Large);
        fixture.detectChanges();
        expect(fixture.componentInstance.logoHeight()).toBe(35);
    });
});
