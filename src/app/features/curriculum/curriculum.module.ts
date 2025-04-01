import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CurriculumComponent } from './curriculum.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EducationComponent } from './components/education/education.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { SoftwareToolsComponent } from './components/software-tools/software-tools.component';
import { WorkExperienceComponent } from './components/work-experience/work-experience.component';
import { TrainingCoursesComponent } from './components/training-courses/training-courses.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { PublicationsComponent } from './components/publications/publications.component';

@NgModule({
    declarations: [
        CurriculumComponent,
        PersonalDataComponent,
        ProfileComponent,
        EducationComponent,
        LanguagesComponent,
        SoftwareToolsComponent,
        WorkExperienceComponent,
        TrainingCoursesComponent,
        CertificationsComponent,
        PublicationsComponent,
    ],
    imports: [CommonModule, SharedModule],
    exports: [CurriculumComponent],
})
export class CurriculumModule {}
