import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, from, mergeMap, throwError } from 'rxjs';

/**
 * HTTP interceptor function that converts Blob-based JSON error responses
 * (typically received when `responseType: 'blob'` is used) into standard
 * `HttpErrorResponse` objects with parsed JSON payloads.
 *
 * This ensures that the frontend can handle API errors consistently,
 * even when the backend sends JSON inside a Blob.W
 */
export function httpBlobErrorInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    return next(req).pipe(
        catchError((error) => {
            // If not blob or not JSON -> rethrow
            if (!(error instanceof HttpErrorResponse && error.error instanceof Blob && error.error.type === 'application/json'))
                return throwError(() => error);

            return from(error.error.text()).pipe(
                mergeMap((errorText) => {
                    try {
                        const errorJson = JSON.parse(errorText);
                        const httpError = new HttpErrorResponse({
                            error: errorJson,
                            headers: error.headers,
                            status: error.status,
                            statusText: error.statusText,
                            url: error.url || undefined,
                        });
                        return throwError(() => httpError);
                    } catch (parseError) {
                        let parseErrorMessage = '';
                        if (parseError instanceof Error) {
                            parseErrorMessage = parseError.message;
                        } else if (typeof parseError === 'string') {
                            parseErrorMessage = parseError;
                        }
                        console.error(`Failed to parse blob error response: ${parseErrorMessage}`);
                        return throwError(() => parseError);
                    }
                })
            );
        })
    );
}
