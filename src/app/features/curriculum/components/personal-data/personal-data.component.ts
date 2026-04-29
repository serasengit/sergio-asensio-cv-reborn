import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { NoCommaPipe } from '@shared/pipes/no-comma.pipe';

@Component({
    selector: 'app-personal-data',
    templateUrl: './personal-data.component.html',
    imports: [TranslateModule, MatIconModule],
    providers: [NoCommaPipe],
})
export class PersonalDataComponent {}
