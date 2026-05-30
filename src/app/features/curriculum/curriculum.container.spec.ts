import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Language } from '@app/app.component';
import { ModuleCode } from '@core/models/module.model';
import { getLanguage } from '@app/store/selectors/app.selectors';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { CurriculumContainer } from './curriculum.container';

describe('CurriculumContainer', () => {
    let leftModule$: Subject<unknown>;
    let languageSignal: ReturnType<typeof signal<Language>>;
    let store: { dispatch: jasmine.Spy; pipe: jasmine.Spy; selectSignal: jasmine.Spy };

    beforeEach(async () => {
        leftModule$ = new Subject();
        languageSignal = signal(Language.Spanish);
        store = {
            dispatch: jasmine.createSpy('dispatch'),
            pipe: jasmine.createSpy('pipe').and.returnValue(leftModule$.asObservable()),
            selectSignal: jasmine.createSpy('selectSignal').and.callFake((selector: unknown) => {
                if (selector === getLanguage) return languageSignal;
                return signal(null);
            }),
        };

        TestBed.overrideComponent(CurriculumContainer, {
            set: { template: '' },
        });

        await TestBed.configureTestingModule({
            imports: [CurriculumContainer],
            providers: [
                { provide: Store, useValue: store },
                { provide: TranslateService, useValue: jasmine.createSpyObj('TranslateService', ['instant', 'use']) },
            ],
        }).compileComponents();
    });

    it('dispatches left modules on init', () => {
        const fixture = TestBed.createComponent(CurriculumContainer);
        const component = fixture.componentInstance;
        spyOn<any>(component, 'listenLeftModule').and.callThrough();

        component.ngOnInit();

        expect(store.dispatch).toHaveBeenCalled();
        expect(component['listenLeftModule']).toHaveBeenCalled();
    });

    it('scrolls to the matching section when the left module changes', () => {
        const fixture = TestBed.createComponent(CurriculumContainer);
        const component = fixture.componentInstance;
        const scrollIntoView = jasmine.createSpy('scrollIntoView');
        spyOn(document, 'getElementById').and.returnValue({ scrollIntoView } as unknown as HTMLElement);

        component.ngOnInit();
        leftModule$.next({ code: 'profile' });

        expect(document.getElementById).toHaveBeenCalledWith('profile');
        expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start', inline: 'start' });
    });

    it('downloads the Spanish CV when the download module is selected in Spanish', () => {
        const fixture = TestBed.createComponent(CurriculumContainer);
        const component = fixture.componentInstance;
        const click = jasmine.createSpy('click');
        const downloadLink = { click } as unknown as HTMLAnchorElement;
        spyOn(document, 'createElement').and.returnValue(downloadLink);

        component.ngOnInit();
        leftModule$.next({ code: ModuleCode.DownloadCV });

        expect(document.createElement).toHaveBeenCalledWith('a');
        expect(downloadLink.href).toContain('assets/cv/sergio-asensio-cv-es.pdf');
        expect(downloadLink.download).toBe('sergio-asensio-cv-es.pdf');
        expect(click).toHaveBeenCalled();
    });

    it('downloads the English CV when the download module is selected in English', () => {
        languageSignal.set(Language.English);
        const fixture = TestBed.createComponent(CurriculumContainer);
        const component = fixture.componentInstance;
        const click = jasmine.createSpy('click');
        const downloadLink = { click } as unknown as HTMLAnchorElement;
        spyOn(document, 'createElement').and.returnValue(downloadLink);

        component.ngOnInit();
        leftModule$.next({ code: ModuleCode.DownloadCV });

        expect(downloadLink.href).toContain('assets/cv/sergio-asensio-cv-en.pdf');
        expect(downloadLink.download).toBe('sergio-asensio-cv-en.pdf');
        expect(click).toHaveBeenCalled();
    });

    it('completes the unsubscribe subject on destroy', () => {
        const fixture = TestBed.createComponent(CurriculumContainer);
        const component = fixture.componentInstance;
        const nextSpy = spyOn(component['unsubscribe$'], 'next').and.callThrough();
        const completeSpy = spyOn(component['unsubscribe$'], 'complete').and.callThrough();

        component.ngOnDestroy();

        expect(nextSpy).toHaveBeenCalled();
        expect(completeSpy).toHaveBeenCalled();
    });
});
