import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TrainingCoursesComponent } from './training-courses.component';

describe('TrainingCoursesComponent', () => {
    it('creates the component', async () => {
        await TestBed.configureTestingModule({
            imports: [TrainingCoursesComponent, TranslateModule.forRoot()],
        }).compileComponents();

        const fixture = TestBed.createComponent(TrainingCoursesComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance).toBeTruthy();
    });
});
