import { HttpErrorResponse, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { APIOperationFailure, APIOperationSuccess } from '@app/store/actions/app.actions';
import { APICode } from '@core/models/API-error.model';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { httpAPIDialogInterceptor } from './http-api-dialog-interceptor';

describe('httpAPIDialogInterceptor', () => {
    let dialog: jasmine.SpyObj<MatDialog>;
    let store: jasmine.SpyObj<Store>;
    let translate: jasmine.SpyObj<TranslateService>;
    let dialogRef: jasmine.SpyObj<MatDialogRef<unknown>>;

    beforeEach(() => {
        dialogRef = jasmine.createSpyObj<MatDialogRef<unknown>>('MatDialogRef', ['afterClosed', 'close']);
        dialogRef.afterClosed.and.returnValue(of(undefined));

        dialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open', 'getDialogById']);
        dialog.open.and.returnValue(dialogRef as never);
        dialog.getDialogById.and.returnValue(null);

        store = jasmine.createSpyObj<Store>('Store', ['dispatch']);
        translate = jasmine.createSpyObj<TranslateService>('TranslateService', ['instant']);
        translate.instant.and.callFake((value: string) => value);

        TestBed.configureTestingModule({
            providers: [
                { provide: MatDialog, useValue: dialog },
                { provide: Store, useValue: store },
                { provide: TranslateService, useValue: translate },
            ],
        });
    });

    it('opens a success dialog for successful non-GET requests', async () => {
        const req = new HttpRequest('POST', '/api/resource', {});

        const result = TestBed.runInInjectionContext(() =>
            httpAPIDialogInterceptor(req, () => of(new HttpResponse({ status: 201, body: {}, url: '/api/resource' })))
        );

        await new Promise<void>((resolve, reject) => {
            result.subscribe({
                next: (event) => {
                    expect(event.type).toBe(HttpEventType.Response);
                    resolve();
                },
                error: reject,
            });
        });

        expect(dialog.open).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(APIOperationSuccess());
    });

    it('skips success dialogs for GET requests', async () => {
        const req = new HttpRequest('GET', '/api/resource');

        const result = TestBed.runInInjectionContext(() =>
            httpAPIDialogInterceptor(req, () => of(new HttpResponse({ status: 200, body: {}, url: '/api/resource' })))
        );

        await new Promise<void>((resolve, reject) => {
            result.subscribe({ next: () => resolve(), error: reject });
        });

        expect(dialog.open).not.toHaveBeenCalled();
        expect(store.dispatch).not.toHaveBeenCalledWith(APIOperationSuccess());
    });

    it('opens a failure dialog for API errors', async () => {
        const req = new HttpRequest('POST', '/api/resource', {});
        const apiError = {
            code: APICode.InternalServerError,
            message: 'server_error',
            errors: [] as { code: string; message: string }[],
            status: 500,
        };

        const result = TestBed.runInInjectionContext(() =>
            httpAPIDialogInterceptor(req, () =>
                throwError(
                    () =>
                        new HttpErrorResponse({
                            status: 500,
                            error: apiError,
                        })
                )
            )
        );

        await new Promise<void>((resolve) => {
            result.subscribe({
                error: () => resolve(),
            });
        });

        expect(dialog.open).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(APIOperationFailure());
    });
});
