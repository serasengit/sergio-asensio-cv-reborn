import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CurriculumModule } from './curriculum/curriculum.module';
import { HomeModule } from './home/home.module';

@NgModule({
    imports: [CommonModule, SharedModule, CurriculumModule, HomeModule],
    exports: [],
    declarations: [],
})
export class FeaturesModule {}
