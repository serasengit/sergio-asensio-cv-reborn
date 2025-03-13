import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SidenavLeftMenuComponent } from './components/sidenav-left-menu/sidenav-left-menu.component';
import { SidenavTopMenuComponent } from './components/sidenav-top-menu/sidenav-top-menu.component';
import { SidenavComponent } from './sidenav.component';
import { SidenavBottomMenuComponent } from './components/sidenav-bottom-menu/sidenav-bottom-menu.component';

@NgModule({
    declarations: [SidenavComponent, SidenavLeftMenuComponent, SidenavTopMenuComponent, SidenavBottomMenuComponent],
    imports: [AppRoutingModule, CommonModule, SharedModule],
    exports: [SidenavComponent],
})
export class SidenavModule {}
