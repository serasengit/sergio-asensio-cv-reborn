import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { CurriculumContainer } from './curriculum.container';

describe('CurriculumContainer', () => {
    let leftModule$: Subject<unknown>;
    let store: { dispatch: jasmine.Spy; pipe: jasmine.Spy };

    beforeEach(async () => {
        leftModule$ = new Subject();
        store = {
            dispatch: jasmine.createSpy('dispatch'),
            pipe: jasmine.createSpy('pipe').and.returnValue(leftModule$.asObservable()),
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
