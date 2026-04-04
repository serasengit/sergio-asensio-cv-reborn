import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from '@app/store/reducers/app.reducers';
import { getLanguage } from '@app/store/selectors/app.selectors';
import { APIError } from '@core/models/API-error.model';
import { Environment } from '@core/models/environment.model';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { select, Store } from '@ngrx/store';
import { MessageDialogComponent, MessageDialogData, MessageType } from '@shared/components/dialogs/message-dialog/message-dialog.component';
import { combineLatest, Observable, throwError } from 'rxjs';
import { catchError, finalize, switchMap, take } from 'rxjs/operators';
import { hideSpinner, showSpinner } from '../../store/actions/app.actions';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    private readonly language$ = this.store.pipe(select(getLanguage));

    private count: number = 0;
    private APIErrors: APIError[] = [];

    constructor(
        @Inject(ENVIRONMENT) private readonly environment: Environment,
        private readonly dg: MatDialog,
        private readonly store: Store<AppState>
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // Show spinner
        this.store.dispatch(showSpinner());
        this.count++;
        return combineLatest([this.language$]).pipe(
            take(1),
            switchMap(([language]) => {
                let headers: HttpHeaders = req.headers.set('Access-Control-Allow-Origin', `${this.environment.API.url}`);
                // Recover language app selected to send it as header param in the request in order to receive server messages translated
                if (language) headers = headers.set('language', language);
                req = req.clone({
                    headers,
                });
                return next.handle(req).pipe(
                    // HTTP error handling
                    catchError((error: any): any => {
                        if (error instanceof ErrorEvent) {
                            // Client-side error
                            console.log(`Client-side error: ${error?.error?.message}`);
                        }
                        this.APIErrors.push(error?.error);
                        return throwError(() => `Errors: ${this.APIErrors}`);
                    }),
                    finalize(() => {
                        this.count--;
                        if (this.count == 0) {
                            // Hide spinner
                            this.store.dispatch(hideSpinner());
                            if (this.APIErrors?.length > 0) {
                                // Show error messages
                                this.showMessages(this.APIErrors);
                            }
                            this.APIErrors = [];
                        }
                    })
                );
            })
        );
    }

    private showMessages(APIErrors: APIError[]): void {
        // Retrieve API messages
        const messages: string[] = APIErrors.map((APIError) =>
            APIError.errors?.length > 0
                ? APIError.errors.map((error: { code: string; message: string }) => error.message)
                : APIError.message
        ).flat();
        // Multiple API messages
        let data: MessageDialogData = {
            type: MessageType.Error,
            title: `an_error_has_ocurred_while_processing_the_request`,
            messages,
        };
        // One API message
        if (messages?.length === 1 && messages[0]) {
            data = {
                type: this.getMessageType(APIErrors[0]),
                title: messages[0],
            };
        }
        // Open message dialog component
        this.dg
            .open(MessageDialogComponent, {
                width: '500px',
                data,
            })
            .afterClosed()
            .pipe(take(1));
    }

    private getMessageType(APIError: APIError): MessageType {
        switch (APIError.status) {
            case 404:
                return MessageType.Informative;
            case 200:
            case 201:
            case 202:
                return MessageType.Success;
            default:
                return MessageType.Error;
        }
    }
}
