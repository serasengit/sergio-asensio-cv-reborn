import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NoCommaPipe } from '@shared/pipes/no-comma.pipe';

@Component({
    selector: 'app-work-experience',
    standalone: true,
    templateUrl: './work-experience.component.html',
    styleUrls: ['./work-experience.component.scss'],
    imports: [TranslateModule, NoCommaPipe],
    providers: [NoCommaPipe],
})
export class WorkExperienceComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
