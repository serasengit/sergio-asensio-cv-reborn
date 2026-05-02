import { HttpContext, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Language } from '@app/app.component';
import { hideSpinner, showSpinner } from '@app/store/actions/app.actions';
import { getLanguage } from '@app/store/selectors/app.selectors';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { Store } from '@ngrx/store';
import { signal } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { httpConfigInterceptor, SKIP_SPINNER } from './http-config-interceptor';

describe('httpConfigInterceptor', () => {
    let store: { dispatch: jasmine.Spy; selectSignal: jasmine.Spy };

    beforeEach(() => {
        store = {
            dispatch: jasmine.createSpy('dispatch'),
            selectSignal: jasmine.createSpy('selectSignal').and.callFake((selector: unknown) => {
                if (selector === getLanguage) return signal(Language.English);
                return signal(null);
            }),
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: Store, useValue: store },
                {
                    provide: ENVIRONMENT,
                    useValue: {
                        production: false,
                        type: 'dev',
                        API: {
                            url: 'http://localhost:3000',
                        },
                    },
                },
            ],
        });
    });

    it('adds API and language headers and tracks the spinner', async () => {
        const req = new HttpRequest('GET', '/api');
        let capturedRequest: HttpRequest<unknown> | undefined;

        const result = TestBed.runInInjectionContext(() =>
            httpConfigInterceptor(req, (forwardedRequest) => {
                capturedRequest = forwardedRequest;
                return of(new HttpResponse({ status: 200 }));
            })
        );

        await firstValueFrom(result);

        expect(capturedRequest?.headers.get('Access-Control-Allow-Origin')).toBe('http://localhost:3000');
        expect(capturedRequest?.headers.get('language')).toBe(Language.English);
        expect(store.dispatch).toHaveBeenCalledWith(showSpinner());
        expect(store.dispatch).toHaveBeenCalledWith(hideSpinner());
    });

    it('does not track the spinner when the request opts out', async () => {
        const req = new HttpRequest('GET', '/api', null, {
            context: new HttpContext().set(SKIP_SPINNER, true),
        });

        const result = TestBed.runInInjectionContext(() =>
            httpConfigInterceptor(req, () => of(new HttpResponse({ status: 200 })))
        );

        await firstValueFrom(result);

        expect(store.dispatch).not.toHaveBeenCalledWith(showSpinner());
        expect(store.dispatch).not.toHaveBeenCalledWith(hideSpinner());
    });
});
