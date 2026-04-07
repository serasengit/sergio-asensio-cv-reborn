import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-education',
    standalone: true,
    templateUrl: './education.component.html',
    styleUrls: ['./education.component.scss'],
    imports: [TranslateModule],
})
export class EducationComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
