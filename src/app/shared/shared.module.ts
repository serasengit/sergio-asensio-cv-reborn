import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { MessageDialogComponent } from './components/dialogs/message-dialog/message-dialog.component';

import { MaterialModule } from './material/material.module';
import { NoCommaPipe } from './pipes/no-comma.pipe';

@NgModule({
    declarations: [MessageDialogComponent, NoCommaPipe],
    imports: [CommonModule, MaterialModule, TranslateModule, FormsModule, ReactiveFormsModule],
    exports: [MaterialModule, TranslateModule, FormsModule, ReactiveFormsModule, NoCommaPipe],
    providers: [TranslateService, TranslateStore, NoCommaPipe],
})
export class SharedModule {}
