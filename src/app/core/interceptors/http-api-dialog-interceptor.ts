import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { APIOperationFailure, APIOperationSuccess } from '@app/store/actions/app.actions';
import { AppState } from '@app/store/reducers/app.reducers';
import { APICode, APIError } from '@core/models/API-error.model';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
    DIALOG_DEFAULT_WIDTH,
    DIALOG_MAX_WIDTH,
    DIALOG_MIN_WIDTH,
    MessageDialogComponent,
    MessageDialogData,
    MessageType,
} from '@shared/presentational-components/dialogs/message-dialog/message-dialog.component';
import { catchError, finalize, Observable, take, tap, throwError } from 'rxjs';

// Global variable to collect API errors
const APIErrors: Set<APIError> = new Set();
let errorDialog: MatDialogRef<MessageDialogComponent> | null = null;

/**
 * HTTP interceptor function that
 * - Shows a message when the request is successful and not a data fetch or errored
 */
export function httpAPIDialogInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    // Inject required services once here
    const dialog = inject(MatDialog);
    const translate = inject(TranslateService);
    const appStore = inject(Store<AppState>);

    return next(req).pipe(
        tap((event) => {
            if (event.type !== HttpEventType.Response) return;
            if (!event.ok) return;
            // Ignore authentication routes, by ignoring /auth and /auth/
            if (req.method === 'GET' || /\/auth($|\/)/.test(req.url)) return;

            showSuccessMessage(event, dialog, appStore);
        }),
        catchError((error) => {
            console.error('Error during request', error);
            if (error?.error && error.error.code !== APICode.InvalidAccessToken && error.error.code !== APICode.SessionExpired)
                APIErrors.add(error.error);
            return throwError(() => error);
        }),
        finalize(() => {
            if (APIErrors.size === 0) return;
            showFailureMessage(dialog, translate, appStore);
        })
    );
}

function showSuccessMessage(event: HttpResponse<unknown>, dialog: MatDialog, appStore: Store<AppState>): void {
    // Cancel if any dialog is open
    if (dialog.getDialogById('api-error-dialog') || dialog.getDialogById('api-success-dialog')) return;
    // Prepare dialog data based on single or multiple messages
    const data: MessageDialogData = {
        type: getMessageTypeByStatus(event.status),
        title: 'operation_completed_successfully',
    };

    // Open the dialog with the Success messages
    dialog
        .open(MessageDialogComponent, {
            id: 'api-success-dialog',
            data,
            width: DIALOG_DEFAULT_WIDTH,
            maxWidth: DIALOG_MAX_WIDTH,
            minWidth: DIALOG_MIN_WIDTH,
        })
        .afterClosed()
        .pipe(take(1))
        .subscribe(() => appStore.dispatch(APIOperationSuccess()));
}

function showFailureMessage(dialog: MatDialog, translate: TranslateService, appStore: Store<AppState>): void {
    // Extract error codes and messages
    const APIErrorsArr = Array.from(APIErrors);
    const messages: string[] = APIErrorsArr.flatMap((error) => (error.errors?.length ? error.errors.map((e) => e.message) : error.message));

    // Determine the title based on the number of messages
    const title =
        messages.length > 1
            ? translate.instant(APICode.OperationCouldNotBeCompleted)
            : (APIErrorsArr[0]?.message ?? translate.instant(APICode.InternalServerError));

    // Check if there is only one message
    const hasOneMessage = messages.length === 1 && messages[0] === title;

    // Prepare dialog data based on single or multiple messages
    const data: MessageDialogData = {
        type: getMessageTypeByErrors(APIErrorsArr),
        title,
        messages: hasOneMessage ? undefined : messages,
    };

    // Cancel if any dialog is open
    dialog.getDialogById('api-success-dialog')?.close();

    // Open the dialog with the error messages
    errorDialog = dialog.open(MessageDialogComponent, {
        data,
        id: 'api-error-dialog',
        width: DIALOG_DEFAULT_WIDTH,
        maxWidth: DIALOG_MAX_WIDTH,
        minWidth: DIALOG_MIN_WIDTH,
    });

    // Clear errors
    APIErrors.clear();

    // Dispatch OperationFailure after the dialog is closed
    errorDialog
        .afterClosed()
        .pipe(take(1))
        .subscribe(() => {
            appStore.dispatch(APIOperationFailure());
        });
}

/**
 * Maps API error HTTP status codes to MessageType for dialog display
 */
function getMessageTypeByStatus(responseStatus: number): MessageType {
    switch (responseStatus) {
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

function getMessageTypeByErrors(errors: APIError[]): MessageType {
    let hasError = false;
    let hasInformative = false;

    for (const error of errors) {
        switch (error.status) {
            case 404:
                hasInformative = true;
                break;
            case 200:
            case 201:
            case 202:
                break;
            default:
                hasError = true;
                break;
        }
    }

    if (hasError) return MessageType.Error;
    if (hasInformative) return MessageType.Informative;
    return MessageType.Success;
}
