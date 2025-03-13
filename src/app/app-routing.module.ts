import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleLink } from '@core/models/module.model';
import { HomeComponent } from '@features/home/home.component';

const routes: Routes = [
    {
        path: ModuleLink.Home,
        component: HomeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
