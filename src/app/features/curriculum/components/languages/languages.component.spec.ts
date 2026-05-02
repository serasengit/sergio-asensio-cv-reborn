import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagesComponent } from './languages.component';

describe('LanguagesComponent', () => {
    it('creates the component', async () => {
        await TestBed.configureTestingModule({
            imports: [LanguagesComponent, TranslateModule.forRoot()],
        }).compileComponents();

        const fixture = TestBed.createComponent(LanguagesComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance).toBeTruthy();
    });
});
