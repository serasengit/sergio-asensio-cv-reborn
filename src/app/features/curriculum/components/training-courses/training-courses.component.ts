import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-training-courses',
    standalone: true,
    templateUrl: './training-courses.component.html',
    styleUrls: ['./training-courses.component.scss'],
    imports: [TranslateModule],
})
export class TrainingCoursesComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
