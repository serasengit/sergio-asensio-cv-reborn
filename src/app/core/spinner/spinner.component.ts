import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppState } from '../../store/reducers/app.reducers';
import { showSpinner } from '../../store/selectors/app.selectors';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
    standalone: false
})
export class SpinnerComponent {
    readonly showSpinner$ = this.store.pipe(select(showSpinner));
    constructor(readonly store: Store<AppState>) {}
}
