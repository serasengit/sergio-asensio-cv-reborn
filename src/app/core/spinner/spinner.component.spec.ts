import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
    it('creates the component and exposes the spinner signal', async () => {
        const store = {
            selectSignal: jasmine.createSpy('selectSignal').and.returnValue(signal(true)),
        };

        await TestBed.configureTestingModule({
            imports: [SpinnerComponent],
            providers: [{ provide: Store, useValue: store }],
        }).compileComponents();

        const fixture = TestBed.createComponent(SpinnerComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance).toBeTruthy();
        expect(fixture.componentInstance.showSpinner()).toBeTrue();
    });
});
