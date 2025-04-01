import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CurriculumComponent } from './curriculum/curriculum.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [],
    declarations: [HomeComponent, CurriculumComponent],
})
export class FeaturesModule {}
