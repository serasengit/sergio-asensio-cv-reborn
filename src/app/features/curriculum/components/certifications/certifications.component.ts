import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-certifications',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './certifications.component.html',
    styleUrls: ['./certifications.component.scss'],
})
export class CertificationsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
