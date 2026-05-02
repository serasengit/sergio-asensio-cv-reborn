import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { EducationComponent } from './education.component';

describe('EducationComponent', () => {
    it('creates the component', async () => {
        await TestBed.configureTestingModule({
            imports: [EducationComponent, TranslateModule.forRoot()],
        }).compileComponents();

        const fixture = TestBed.createComponent(EducationComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance).toBeTruthy();
    });
});
