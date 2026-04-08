import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NoCommaPipe } from '@shared/pipes/no-comma.pipe';

@Component({
    selector: 'app-personal-data',
    templateUrl: './personal-data.component.html',
    imports: [TranslateModule],
    providers: [NoCommaPipe],
})
export class PersonalDataComponent {}
