import { DOCUMENT } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Language } from '@app/app.component';
import { AppState } from '@app/store/reducers/app.reducers';
import { getLanguage, getLeftModule } from '@app/store/selectors/app.selectors';
import { Module, ModuleCode } from '@core/models/module.model';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { setLeftModules } from '../../store/actions/app.actions';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { EducationComponent } from './components/education/education.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { SoftwareToolsComponent } from './components/software-tools/software-tools.component';
import { TrainingCoursesComponent } from './components/training-courses/training-courses.component';
import { WorkExperienceComponent } from './components/work-experience/work-experience.component';
import { ProfileComponent } from './profile/profile.component';

const CURRICULUM_MODULES: Module[] = [
    {
        code: ModuleCode.PersonalData,
        icon: 'badge',
    },
    {
        code: ModuleCode.Profile,
        icon: 'account_circle',
    },
    {
        code: ModuleCode.WorkExperience,
        icon: 'trending_up',
    },
    {
        code: ModuleCode.SoftwareTools,
        icon: 'code',
    },
    {
        code: ModuleCode.Education,
        icon: 'school',
    },
    {
        code: ModuleCode.Certifications,
        icon: 'verified',
    },
    {
        code: ModuleCode.TrainingCourses,
        icon: 'menu_book',
    },
    {
        code: ModuleCode.Languages,
        icon: 'language',
    },
    {
        code: ModuleCode.Publications,
        icon: 'article',
    },

    {
        code: ModuleCode.DownloadCV,
        icon: 'picture_as_pdf',
    },
];
@Component({
    selector: 'app-curriculum',

    imports: [
        CertificationsComponent,
        EducationComponent,
        LanguagesComponent,
        ProfileComponent,
        PersonalDataComponent,
        PublicationsComponent,
        SoftwareToolsComponent,
        TrainingCoursesComponent,
        WorkExperienceComponent,
    ],
    templateUrl: './curriculum.container.html',
    styleUrls: ['./curriculum.container.scss'],
})
export class CurriculumContainer implements OnInit, OnDestroy {
    private readonly appStore: Store<AppState> = inject(Store<AppState>);
    private readonly document = inject(DOCUMENT);
    private readonly unsubscribe$: Subject<void> = new Subject<void>();
    private readonly leftModule$ = this.appStore.pipe(select(getLeftModule));
    private readonly language = this.appStore.selectSignal(getLanguage);
    private readonly cvFileByLanguage: Record<Language, string> = {
        [Language.English]: 'assets/cv/sergio-asensio-cv-en.pdf',
        [Language.Spanish]: 'assets/cv/sergio-asensio-cv-es.pdf',
    };

    public ngOnInit(): void {
        this.loadLeftModules();
        this.listenLeftModule();
    }

    private loadLeftModules(): void {
        this.appStore.dispatch(setLeftModules({ modules: CURRICULUM_MODULES }));
    }

    private listenLeftModule(): void {
        this.leftModule$.pipe(takeUntil(this.unsubscribe$)).subscribe((module: Module) => {
            this.scrollToModule(module);
        });
    }

    private scrollToModule(module: Module): void {
        if (module?.code) {
            if (module.code === ModuleCode.DownloadCV) {
                this.downloadCurriculumVitae();
                return;
            }

            const section: HTMLElement = this.document.getElementById(module.code);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
            }
        }
    }

    private downloadCurriculumVitae(): void {
        const currentLanguage = this.language() ?? Language.Spanish;
        const relativePath = this.cvFileByLanguage[currentLanguage];
        const downloadLink = this.document.createElement('a');

        downloadLink.href = new URL(relativePath, this.document.baseURI).toString();
        downloadLink.download = relativePath.split('/').pop() ?? 'Curriculum_Vitae.pdf';
        downloadLink.rel = 'noopener';
        downloadLink.click();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
