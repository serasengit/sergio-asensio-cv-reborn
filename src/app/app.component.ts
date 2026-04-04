import { Component, HostListener, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { setDeviceType } from './store/actions/app.actions';
import { AppState } from './store/reducers/app.reducers';
import { getLanguage } from './store/selectors/app.selectors';

export enum DeviceType {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
    ExtraLarge = 'extra_large',
}

export enum DeviceMinWidth {
    Small = 0,
    Medium = 768,
    Large = 960,
    ExtraLarge = 1200,
}

export enum Language {
    Spanish = 'es',
    English = 'en',
}
export const DEFAULT_LANGUAGE = Language.Spanish;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnDestroy {
    private readonly unsubscribe$: Subject<void> = new Subject<void>();
    // Observable language listener that changes the app language  when it is selected from sidenav component
    private readonly language$ = this.store
        .pipe(select(getLanguage), takeUntil(this.unsubscribe$))
        .subscribe((language: Language) => {
            this.translate.use(language);
        });

    constructor(readonly store: Store<AppState>, readonly translate: TranslateService) {
        translate.addLangs([Language.Spanish, Language.English]); // Languages supported by the application
        translate.setDefaultLang(DEFAULT_LANGUAGE);
    }

    // Function which stores in the app store the device type in which the app is being used (this observable is updating every time the user modifies the browser screen width)
    @HostListener('window:resize', ['$event'])
    public onResize($event: any): void {
        this.store.dispatch(
            setDeviceType({
                deviceType: getDevice($event.target.innerWidth),
            })
        );
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

// Function which returns the device type in which the app is being used (browser width is sent as parameter to calculate it)
export function getDevice(width: number): DeviceType {
    let devicType: DeviceType = DeviceType.Small;
    switch (true) {
        case width >= DeviceMinWidth.Small && width < DeviceMinWidth.Medium:
            devicType = DeviceType.Small;
            break;
        case width >= DeviceMinWidth.Medium && width < DeviceMinWidth.Large:
            devicType = DeviceType.Medium;
            break;
        case width >= DeviceMinWidth.Large && width < DeviceMinWidth.ExtraLarge:
            devicType = DeviceType.Large;
            break;
        case width >= DeviceMinWidth.ExtraLarge:
            devicType = DeviceType.ExtraLarge;
            break;
        default:
            break;
    }
    return devicType;
}
