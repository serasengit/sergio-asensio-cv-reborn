import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CertificationsComponent } from './certifications.component';

describe('CertificationsComponent', () => {
    it('creates the component', async () => {
        await TestBed.configureTestingModule({
            imports: [CertificationsComponent, TranslateModule.forRoot()],
        }).compileComponents();

        const fixture = TestBed.createComponent(CertificationsComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance).toBeTruthy();
    });
});
