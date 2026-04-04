import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { appReducer } from '@app/store/reducers/app.reducers';
import { CoreModule } from '@core/core.module';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { HttpConfigInterceptor } from './http-config-interceptor';

describe('HttpConfigInterceptor: Interceptor', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(async () => {
        TestBed.configureTestingModule({
    imports: [CoreModule, StoreModule.forRoot({ app: appReducer })],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpConfigInterceptor,
            multi: true,
        },
        { provide: ENVIRONMENT, useValue: environment },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
});
        // Inject the http service and test controller for each test
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });
    it('should add an Access-Control-Allow-Origin header', () => {
        httpClient.get('./assets/mocks/users.json').subscribe((res) => {
            expect(res).toBeDefined();
        });
        const httpRequest = httpTestingController.expectOne('./assets/mocks/users.json');
        expect(httpRequest.request.headers.has('Access-Control-Allow-Origin')).toEqual(true);
    });

    it('should add an language header', () => {
        httpClient.get('./assets/mocks/users.json').subscribe((res) => {
            expect(res).toBeDefined();
        });
        const httpRequest = httpTestingController.expectOne('./assets/mocks/users.json');
        expect(httpRequest.request.headers.has('language')).toEqual(true);
    });
    it('should return 404 not found', () => {
        const data = 'undefined';
        const url = 'no-url';
        const mockErrorResponse = { status: 404, statusText: 'Not Found' };
        httpClient.get(url).subscribe({
            error: (error: HttpErrorResponse) => {
                expect(error).toBeDefined();
            },
        });
        const httpRequest = httpTestingController.expectOne(url);
        httpRequest.flush(data, mockErrorResponse);
    });
});
