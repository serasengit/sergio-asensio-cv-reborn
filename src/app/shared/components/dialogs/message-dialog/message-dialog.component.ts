import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

export enum MessageType {
    Informative,
    Success,
    Warning,
    Error,
}

export interface MessageDialogData {
    type: MessageType;
    title: string;
    messages?: string[];
}
@Component({
    selector: 'app-message-dialog',
    templateUrl: './message-dialog.component.html',
    styleUrls: ['./message-dialog.component.scss'],
})
export class MessageDialogComponent {
    public readonly MessageType = MessageType;
    constructor(readonly dg: MatDialogRef<MessageDialogComponent>, @Inject(MAT_DIALOG_DATA) readonly data: MessageDialogData) {}

    public get color(): string {
        switch (this.data.type) {
            case MessageType.Informative:
                return 'primary';
            case MessageType.Error:
                return 'error';
            case MessageType.Warning:
                return 'warn';
            case MessageType.Success:
                return 'success';
            default:
                return 'error';
        }
    }
}
