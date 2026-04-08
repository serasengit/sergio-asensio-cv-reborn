import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

export const DIALOG_DEFAULT_WIDTH = '1200px';
export const DIALOG_MAX_WIDTH = '90vw';
export const DIALOG_MIN_WIDTH = '320px';
export const DIALOG_DEFAULT_HEIGHT = '100vh';
export const DIALOG_MAX_HEIGHT = '98vh';

export enum MessageType {
    Informative,
    Success,
    Warning,
    Error,
}

export interface MessageDialogButtonData {
    label: string;
    class: string;
    icon: string;
    result: boolean;
}

export interface MessageDialogData {
    type: MessageType;
    title: string;
    messages?: string[];
    buttons?: MessageDialogButtonData[];
}

@Component({
    selector: 'app-message-dialog',

    imports: [MatIconModule, MatButtonModule, TranslateModule, MatDialogModule],
    templateUrl: './message-dialog.component.html',
    styleUrls: ['./message-dialog.component.scss'],
})
export class MessageDialogComponent implements OnInit {
    public static readonly CLOSE_BUTTON = [{ label: 'close', class: 'mat-raised-secondary-button', icon: '', result: false }];
    public static readonly CONFIRM_BUTTONS: MessageDialogButtonData[] = [
        { label: 'cancel', class: 'mat-raised-secondary-button', icon: '', result: false },
        { label: 'accept', class: 'mat-raised-tertiary-button', icon: '', result: true },
    ];
    public static readonly DANGEROUS_CONFIRM_BUTTONS: MessageDialogButtonData[] = [
        { label: 'cancel', class: 'mat-raised-secondary-button', icon: '', result: false },
        { label: 'accept', class: 'mat-raised-danger-button', icon: '', result: true },
    ];

    public readonly MessageType = MessageType;
    readonly dg = inject(MatDialogRef<MessageDialogComponent>);
    readonly data = inject(MAT_DIALOG_DATA) as MessageDialogData;

    readonly buttons = signal<MessageDialogButtonData[]>(MessageDialogComponent.CLOSE_BUTTON);

    ngOnInit(): void {
        if (this.data.buttons?.length > 0) {
            this.buttons.set(this.data.buttons);
        }
    }

    onClick(result: unknown): void {
        this.dg.close(result);
    }
}
