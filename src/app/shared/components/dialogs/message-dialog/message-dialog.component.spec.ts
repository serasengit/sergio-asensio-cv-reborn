/* eslint-disable @typescript-eslint/no-empty-function */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';

import { MessageDialogComponent, MessageDialogData, MessageType } from './message-dialog.component';

describe('Message Dialog: Component', () => {
    const dialogMock = {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        close: () => {},
    };
    let fixture: ComponentFixture<MessageDialogComponent>;
    let messageDialog: MessageDialogComponent;
    let dg: MatDialog;
    const data: MessageDialogData = {
        type: MessageType.Error,
        title: 'an_error_has_ocurred_with_the_request',
        messages: ['Error Message 1', 'Error Message 2'],
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SharedModule, TranslateModule.forRoot(), BrowserAnimationsModule],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: data },
                { provide: MatDialogRef, useValue: dialogMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MessageDialogComponent);
        messageDialog = fixture.componentInstance;
        dg = TestBed.inject(MatDialog);
    });

    it('should create dialog component', () => {
        expect(messageDialog).toBeTruthy();
    });
    it('should open dialog component', () => {
        const title: string = 'an_error_has_ocurred_with_the_request';
        const messages: string[] = ['Error Message 1', 'Error Message 2'];
        const spy: jasmine.Spy = spyOn(TestBed.inject(MatDialog), 'open').and.callThrough();
        dg.open(MessageDialogComponent, {
            width: '500px',
            data: {
                type: MessageType.Error,
                title,
                messages,
            },
        });
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(MessageDialogComponent, {
            width: '500px',
            data,
        });
    });
    it('should show sent title', () => {
        dg.open(MessageDialogComponent, {
            width: '500px',
            data,
        });
        fixture.detectChanges();
        const title = fixture.debugElement.query(By.css('.message-dialog__title')).nativeElement.textContent;
        expect(title).toContain(data.title);
    });
    it('should close dialog component', () => {
        const title: string = 'an_error_has_ocurred_with_the_request';
        const messages: string[] = ['Error Message 1', 'Error Message 2'];
        const spy: jasmine.Spy = spyOn(messageDialog.dg, 'close').and.callThrough();
        dg.open(MessageDialogComponent, {
            width: '500px',
            data: {
                type: MessageType.Error,
                title,
                messages,
            },
        });
        fixture.detectChanges();
        const closeBtn = fixture.debugElement.query(By.css('button'));
        closeBtn.triggerEventHandler('click', {});
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });
});
