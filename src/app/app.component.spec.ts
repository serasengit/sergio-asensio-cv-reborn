import { LOCALE_ID, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DateAdapter } from '@angular/material/core';
import { Language, AppComponent, getDefaultLanguage } from './app.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { setDeviceType } from './store/actions/app.actions';

describe('AppComponent', () => {
    let store: { dispatch: jasmine.Spy; selectSignal: jasmine.Spy };
    let translate: jasmine.SpyObj<TranslateService>;
    let dateAdapter: jasmine.SpyObj<DateAdapter<unknown>>;

    beforeEach(async () => {
        store = {
            dispatch: jasmine.createSpy('dispatch'),
            selectSignal: jasmine.createSpy('selectSignal').and.returnValue(signal(Language.English)),
        };
        translate = jasmine.createSpyObj<TranslateService>('TranslateService', ['addLangs', 'setFallbackLang', 'use']);
        dateAdapter = jasmine.createSpyObj<DateAdapter<unknown>>('DateAdapter', ['setLocale']);

        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                { provide: Store, useValue: store },
                { provide: TranslateService, useValue: translate },
                { provide: DateAdapter, useValue: dateAdapter },
                { provide: LOCALE_ID, useValue: 'es' },
            ],
        }).compileComponents();
    });

    it('prefers the stored language', () => {
        spyOn(localStorage, 'getItem').and.returnValue(Language.English);

        expect(getDefaultLanguage()).toBe(Language.English);
    });

    it('falls back to the browser language when no stored value exists', () => {
        spyOn(localStorage, 'getItem').and.returnValue(null);
        spyOnProperty(navigator, 'language', 'get').and.returnValue('en-GB');

        expect(getDefaultLanguage()).toBe(Language.English);
    });

    it('creates the component and configures language services', () => {
        const html = document.createElement('html');
        spyOn(document, 'querySelector').and.returnValue(html);

        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance).toBeTruthy();
        expect(translate.addLangs).toHaveBeenCalledWith([Language.Spanish, Language.English]);
        expect(dateAdapter.setLocale).toHaveBeenCalled();
        expect(html.getAttribute('lang')).toBeTruthy();
    });

    it('dispatches device type updates', () => {
        const fixture = TestBed.createComponent(AppComponent);

        fixture.componentInstance.setDeviceType('Large' as never);

        expect(store.dispatch).toHaveBeenCalledWith(setDeviceType({ deviceType: 'Large' as never }));
    });
});
