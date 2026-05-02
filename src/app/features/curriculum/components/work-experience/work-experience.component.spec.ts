import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { WorkExperienceComponent } from './work-experience.component';

describe('WorkExperienceComponent', () => {
    it('creates the component', async () => {
        await TestBed.configureTestingModule({
            imports: [WorkExperienceComponent, TranslateModule.forRoot()],
        }).compileComponents();

        const fixture = TestBed.createComponent(WorkExperienceComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance).toBeTruthy();
    });
});
