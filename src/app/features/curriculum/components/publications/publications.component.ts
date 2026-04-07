import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-publications',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
