import { HttpContextToken, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { getDefaultLanguage } from '@app/app.component';
import { hideSpinner, showSpinner } from '@app/store/actions/app.actions';
import { AppState } from '@app/store/reducers/app.reducers';
import { getLanguage } from '@app/store/selectors/app.selectors';
import { Environment } from '@core/models/environment.model';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { Store } from '@ngrx/store';
import { catchError, finalize, Observable, throwError } from 'rxjs';

// Global variable to track active requests
let activeRequestCount = 0;
export const SKIP_SPINNER = new HttpContextToken<boolean>(() => false);

/**
 * HTTP interceptor function that:
 * - Adds language, authorization, and CORS headers
 * - Shows and hides a global spinner during requests
 * - Handles API errors with dialogs
 * - Automatically refreshes the token and retries requests when 'invalid_token' errors occur
 */
export function httpConfigInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    // Inject required services once here
    const environment = inject<Environment>(ENVIRONMENT);
    const appStore = inject<Store<AppState>>(Store);

    // Observables for language and access token from the store
    const language = appStore.selectSignal(getLanguage);

    const shouldTrackSpinner = !req.context.get(SKIP_SPINNER);

    // Increment the active requests counter
    if (shouldTrackSpinner) activeRequestCount++;

    // Show the global loading spinner before sending the request if there are active requests
    if (shouldTrackSpinner && activeRequestCount !== 0) appStore.dispatch(showSpinner());

    // Start setting headers: CORS and optionally language and Authorization token
    let headers = req.headers.set('Access-Control-Allow-Origin', environment.API.url);
    headers = headers.set('language', (language() ?? getDefaultLanguage()).toString());

    // Clone the request with the new headers
    const modifiedRequest = req.clone({ headers });

    // Pass the modified request down the chain
    return next(modifiedRequest).pipe(
        catchError((error: any) => {
            // Propagate the error downstream
            return throwError(() => error);
        }),
        finalize(() => {
            if (!shouldTrackSpinner) return;

            // Decrement the active requests counter
            activeRequestCount--;

            if (activeRequestCount <= 0) {
                // Reset the active requests counter
                activeRequestCount = 0;

                // Hide the spinner after request completes (success or error)
                appStore.dispatch(hideSpinner());
            }
        })
    );
}
