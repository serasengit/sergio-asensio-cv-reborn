import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { IntroductionComponent } from './introduction.component';

describe('IntroductionComponent', () => {
    it('creates the component', async () => {
        await TestBed.configureTestingModule({
            imports: [IntroductionComponent, TranslateModule.forRoot()],
        }).compileComponents();

        const fixture = TestBed.createComponent(IntroductionComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance).toBeTruthy();
    });
});
