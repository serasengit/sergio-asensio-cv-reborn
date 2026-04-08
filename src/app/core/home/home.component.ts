import { Component } from '@angular/core';
import { SidenavContainer } from '@core/sidenav/sidenav.container';

@Component({
    selector: 'app-home',

    imports: [SidenavContainer],
    templateUrl: './home.component.html',
})
export class HomeComponent {}
