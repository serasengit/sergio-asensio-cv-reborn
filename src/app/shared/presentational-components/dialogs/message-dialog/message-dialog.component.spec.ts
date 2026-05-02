import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MessageDialogComponent, MessageType } from './message-dialog.component';

describe('MessageDialogComponent', () => {
    let dialogRef: jasmine.SpyObj<MatDialogRef<MessageDialogComponent>>;

    beforeEach(async () => {
        dialogRef = jasmine.createSpyObj<MatDialogRef<MessageDialogComponent>>('MatDialogRef', ['close']);

        await TestBed.configureTestingModule({
            imports: [MessageDialogComponent, TranslateModule.forRoot()],
            providers: [
                { provide: MatDialogRef, useValue: dialogRef },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        type: MessageType.Success,
                        title: 'done',
                        buttons: [{ label: 'accept', class: 'primary', icon: 'check', result: true }],
                    },
                },
            ],
        }).compileComponents();
    });

    it('uses custom buttons when provided', () => {
        const fixture = TestBed.createComponent(MessageDialogComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance.buttons()).toEqual([
            { label: 'accept', class: 'primary', icon: 'check', result: true },
        ]);
    });

    it('closes the dialog with the clicked result', () => {
        const fixture = TestBed.createComponent(MessageDialogComponent);
        fixture.detectChanges();

        fixture.componentInstance.onClick(true);

        expect(dialogRef.close).toHaveBeenCalledWith(true);
    });
});
