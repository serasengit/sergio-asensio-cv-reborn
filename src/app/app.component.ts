import { Component, effect, inject, LOCALE_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateAdapter } from '@angular/material/core';
import { RouterOutlet } from '@angular/router';
import { DeviceType, getDevice, isDeviceSmallerThan } from '@core/models/device-type.model';
import { SpinnerComponent } from '@core/spinner/spinner.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, Subject } from 'rxjs';
import { hideSidenav, setDeviceType } from './store/actions/app.actions';
import { AppState } from './store/reducers/app.reducers';
import { getLanguage } from './store/selectors/app.selectors';

export enum Language {
    Spanish = 'es',
    English = 'en',
}
const isLanguage = (value: string | null): value is Language => value === Language.Spanish || value === Language.English;

const resolveLanguage = (value: string | null): Language | null => (isLanguage(value) ? value : null);

export const getDefaultLanguage = (): Language => {
    const storedLanguage = resolveLanguage(localStorage.getItem('language'));
    if (storedLanguage) return storedLanguage;

    const browserLanguage = resolveLanguage(navigator.language?.split('-')[0] ?? null);
    return browserLanguage ?? Language.Spanish;
};

export const DEFAULT_LANGUAGE = getDefaultLanguage();

@Component({
    selector: 'app-root',

    imports: [RouterOutlet, SpinnerComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    host: {
        '(window:resize)': 'onResize($event)',
    },
})
export class AppComponent {
    private readonly appStore: Store<AppState> = inject(Store<AppState>);

    private readonly translate = inject(TranslateService);
    private readonly dateAdapter = inject(DateAdapter);
    private readonly locale = inject(LOCALE_ID);
    private readonly resizeSubject = new Subject<number>();

    readonly language = this.appStore.selectSignal(getLanguage);

    // Initialization block (runs when the class is instantiated)
    constructor() {
        this.configLanguage();
        this.initializeResizeListener();
    }

    // Function which stores in the app store the selected language
    private configLanguage(): void {
        this.translate.addLangs([Language.Spanish, Language.English]);
        this.translate.setFallbackLang(getDefaultLanguage());
        this.dateAdapter.setLocale(this.locale);
        document.querySelector('html').setAttribute('lang', this.locale);
    }

    // Function which stores in the app store the selected language
    readonly onLanguageChange = effect(() => {
        const language = this.language() ?? getDefaultLanguage();
        localStorage.setItem('language', language);
        this.translate.use(language);
        this.dateAdapter.setLocale(language);
        document.querySelector('html').setAttribute('lang', language);
    });

    public onResize($event: any): void {
        this.resizeSubject.next($event.target.innerWidth);
    }

    // Function which stores in the app store with a delay of 200 milliseconds the device type in which the app is being used (this observable is updating every time the user modifies the browser screen width)
    private initializeResizeListener(): void {
        this.resizeSubject.pipe(takeUntilDestroyed(), debounceTime(200)).subscribe((width: number) => {
            const deviceType: DeviceType = getDevice(width);
            this.setDeviceType(deviceType);
            if (isDeviceSmallerThan(deviceType, DeviceType.Medium)) {
                this.appStore.dispatch(hideSidenav());
            }
        });
    }

    public setDeviceType(deviceType: DeviceType): void {
        this.appStore.dispatch(setDeviceType({ deviceType }));
    }
}
