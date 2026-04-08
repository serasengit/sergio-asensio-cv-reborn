import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/app.reducers';
import { showSpinner } from '../../store/selectors/app.selectors';

@Component({
    selector: 'app-spinner',

    imports: [MatProgressSpinnerModule],
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
    readonly appStore = inject(Store<AppState>);
    readonly showSpinner = this.appStore.selectSignal(showSpinner);
}
