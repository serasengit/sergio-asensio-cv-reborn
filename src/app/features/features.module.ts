import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [],
    declarations: [HomeComponent],
})
export class FeaturesModule {}
