import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-languages',
    standalone: true,
    templateUrl: './languages.component.html',
    styleUrls: ['./languages.component.scss'],
    imports: [TranslateModule],
})
export class LanguagesComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
