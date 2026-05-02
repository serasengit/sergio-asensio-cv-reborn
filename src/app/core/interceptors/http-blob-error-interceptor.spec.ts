import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { firstValueFrom, of, throwError } from 'rxjs';
import { httpBlobErrorInterceptor } from './http-blob-error-interceptor';

describe('httpBlobErrorInterceptor', () => {
    it('rethrows non-blob errors unchanged', async () => {
        const error = new HttpErrorResponse({ status: 500, error: { message: 'boom' } });
        const req = new HttpRequest('GET', '/api');

        await expectAsync(firstValueFrom(httpBlobErrorInterceptor(req, () => throwError(() => error)))).toBeRejectedWith(error);
    });

    it('converts JSON blob errors into HttpErrorResponse instances with parsed payload', async () => {
        const payload = { code: 'error_code', message: 'failed' };
        const error = new HttpErrorResponse({
            status: 400,
            statusText: 'Bad Request',
            url: '/api',
            error: new Blob([JSON.stringify(payload)], { type: 'application/json' }),
        });
        const req = new HttpRequest('GET', '/api');

        try {
            await firstValueFrom(httpBlobErrorInterceptor(req, () => throwError(() => error)));
            fail('Expected request to fail');
        } catch (caught) {
            expect(caught instanceof HttpErrorResponse).toBeTrue();
            expect((caught as HttpErrorResponse).error).toEqual(payload);
            expect((caught as HttpErrorResponse).status).toBe(400);
        }
    });

    it('passes successful responses through untouched', async () => {
        const req = new HttpRequest('GET', '/api');
        const response = { ok: true };

        await expectAsync(firstValueFrom(httpBlobErrorInterceptor(req, () => of(response as never)))).toBeResolvedTo(response as never);
    });
});
