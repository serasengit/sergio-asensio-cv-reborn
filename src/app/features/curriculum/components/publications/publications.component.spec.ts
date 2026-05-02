import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PublicationsComponent } from './publications.component';

describe('PublicationsComponent', () => {
    it('creates the component', async () => {
        await TestBed.configureTestingModule({
            imports: [PublicationsComponent, TranslateModule.forRoot()],
        }).compileComponents();

        const fixture = TestBed.createComponent(PublicationsComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance).toBeTruthy();
    });
});
