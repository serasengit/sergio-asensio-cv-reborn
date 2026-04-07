import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NoCommaPipe } from '@shared/pipes/no-comma.pipe';

@Component({
    selector: 'app-personal-data',
    standalone: true,
    templateUrl: './personal-data.component.html',
    styleUrls: ['./personal-data.component.scss'],
    imports: [TranslateModule],
    providers: [NoCommaPipe],
})
export class PersonalDataComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
