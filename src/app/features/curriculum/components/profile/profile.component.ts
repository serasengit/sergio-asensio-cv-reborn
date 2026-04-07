import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NoCommaPipe } from '@shared/pipes/no-comma.pipe';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    imports: [TranslateModule, NoCommaPipe],
    providers: [NoCommaPipe],
})
export class ProfileComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
