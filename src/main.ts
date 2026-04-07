import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import { enableProdMode, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent, DEFAULT_LANGUAGE } from '@app/app.component';
import { appReducer } from '@app/store/reducers/app.reducers';
import { httpAPIDialogInterceptor } from '@core/interceptors/http-api-dialog-interceptor';
import { httpConfigInterceptor } from '@core/interceptors/http-config-interceptor';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from './environments/environment';
import { routes } from './routes';

// Register Spanish locale data
registerLocaleData(localeEs, 'es');
// Register English locale data
registerLocaleData(localeEn, 'en');

// Enable production mode if the app is running in production environment
if (environment.production) {
    enableProdMode();
}

// Bootstrap the application with all necessary providers
bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(), // Provide Angular's HttpClient
        provideRouter(routes, withComponentInputBinding()), // Provide app routes
        provideStore({
            app: appReducer,
        }), // Provide global store (legacy syntax)
        provideStoreDevtools({
            maxAge: 25, // Keep last 25 states
            logOnly: environment.production, // Restrict devtools in production
            autoPause: true, // Pause recording when not active
        }),
        { provide: ENVIRONMENT, useValue: environment }, // Provide custom ENVIRONMENT token

        // Provide translation module with custom loader
        importProvidersFrom([
            TranslateModule.forRoot({
                useDefaultLang: true,
            }),
        ]),
        ...provideTranslateHttpLoader({
            prefix: './assets/i18n/',
            suffix: '.json',
        }),
        // Import the HTTP client with interceptors
        provideHttpClient(withInterceptors([httpConfigInterceptor, httpAPIDialogInterceptor])),
        { provide: LOCALE_ID, useValue: DEFAULT_LANGUAGE },
        provideNativeDateAdapter(),
    ],
}).catch((err) => console.error(err)); // Log bootstrap errors
