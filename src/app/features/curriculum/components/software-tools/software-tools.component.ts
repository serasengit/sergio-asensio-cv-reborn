import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-software-tools',
    standalone: true,
    templateUrl: './software-tools.component.html',
    styleUrls: ['./software-tools.component.scss'],
    imports: [TranslateModule],
})
export class SoftwareToolsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
