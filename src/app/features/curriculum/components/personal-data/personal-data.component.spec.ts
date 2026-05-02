import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PersonalDataComponent } from './personal-data.component';

describe('PersonalDataComponent', () => {
    it('creates the component', async () => {
        await TestBed.configureTestingModule({
            imports: [PersonalDataComponent, TranslateModule.forRoot()],
        }).compileComponents();

        const fixture = TestBed.createComponent(PersonalDataComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance).toBeTruthy();
    });
});
