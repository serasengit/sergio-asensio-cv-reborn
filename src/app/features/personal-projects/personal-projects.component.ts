import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface PersonalProject {
    readonly code: string;
    readonly repoUrl: string;
}

@Component({
    selector: 'app-personal-projects',
    imports: [CommonModule, TranslateModule],
    templateUrl: './personal-projects.component.html',
    styleUrls: ['./personal-projects.component.scss'],
})
export class PersonalProjectsComponent {
    readonly projects: PersonalProject[] = [
        {
            code: 'flutter_base_app',
            repoUrl: 'https://github.com/serasengit/flutter-base-app',
        },
        {
            code: 'node_base_app',
            repoUrl: 'https://github.com/serasengit/node-base-app',
        },
        {
            code: 'sergio_asensio_cv_reborn',
            repoUrl: 'https://github.com/serasengit/sergio-asensio-cv-reborn',
        },
    ];
}
