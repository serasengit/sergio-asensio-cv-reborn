import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ModuleCode } from '@core/models/module.model';
import { HomeComponent } from '@features/home/home.component';

const routes: Routes = [
    {
        path: ModuleCode.Home,
        component: HomeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
