import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NoCommaPipe } from '@shared/pipes/no-comma.pipe';

@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html',
    imports: [TranslateModule, NoCommaPipe],
    providers: [NoCommaPipe],
})
export class IntroductionComponent {}
