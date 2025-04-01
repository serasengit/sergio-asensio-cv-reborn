import { Component, OnDestroy } from '@angular/core';
import { AppState } from '@app/store/reducers/app.reducers';
import { Module, ModuleCode } from '@core/models/module.model';
import { select, Store } from '@ngrx/store';
import { setLeftModules } from '../../store/actions/app.actions';
import { getLeftModule } from '@app/store/selectors/app.selectors';
import { Subject, takeUntil } from 'rxjs';

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
        code: ModuleCode.Education,
        icon: 'school',
    },
    {
        code: ModuleCode.Languages,
        icon: 'language',
    },
    {
        code: ModuleCode.SoftwareTools,
        icon: 'code',
    },
    {
        code: ModuleCode.WorkExperience,
        icon: 'trending_up',
    },
    {
        code: ModuleCode.TrainingCourses,
        icon: 'menu_book',
    },
    {
        code: ModuleCode.Certifications,
        icon: 'verified',
    },
    {
        code: ModuleCode.Publications,
        icon: 'attach_file',
    },
    {
        code: ModuleCode.DownloadCV,
        icon: 'picture_as_pdf',
    },
];
@Component({
    selector: 'app-curriculum',
    templateUrl: './curriculum.component.html',
    styleUrls: ['./curriculum.component.scss'],
})
export class CurriculumComponent implements OnDestroy {
    private readonly unsubscribe$: Subject<void> = new Subject<void>();
    private readonly leftModule$ = this.appStore.pipe(select(getLeftModule));

    constructor(private readonly appStore: Store<AppState>) {
        this.setLeftModules();
        this.subscribeToLeftModule();
    }

    private setLeftModules(): void {
        this.appStore.dispatch(setLeftModules({ modules: CURRICULUM_MODULES }));
    }

    private subscribeToLeftModule(): void {
        this.leftModule$.pipe(takeUntil(this.unsubscribe$)).subscribe((module: Module) => {
            this.scrollToModule(module);
        });
    }

    private scrollToModule(module: Module): void {
        if (module?.code) {
            const section: HTMLElement = document.getElementById(module.code);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
            }
        }
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
