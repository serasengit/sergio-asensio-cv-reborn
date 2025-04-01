import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleLink } from '@core/models/module.model';
import { CurriculumComponent } from '@features/curriculum/curriculum.component';
import { HomeComponent } from '@features/home/home.component';

const routes: Routes = [
    {
        path: ModuleLink.Home,
        component: HomeComponent,
    },
    {
        path: ModuleLink.Curriculum,
        component: CurriculumComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
