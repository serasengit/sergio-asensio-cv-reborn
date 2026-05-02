import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SoftwareToolsComponent } from './software-tools.component';

describe('SoftwareToolsComponent', () => {
    it('creates the component', async () => {
        await TestBed.configureTestingModule({
            imports: [SoftwareToolsComponent, TranslateModule.forRoot()],
        }).compileComponents();

        const fixture = TestBed.createComponent(SoftwareToolsComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance).toBeTruthy();
    });
});
