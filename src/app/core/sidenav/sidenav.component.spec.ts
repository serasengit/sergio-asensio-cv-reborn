import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSidenavHarness } from '@angular/material/sidenav/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Language } from '@app/app.component';
import { HttpLoaderFactory } from '@app/app.module';
import { appReducer } from '@app/store/reducers/app.reducers';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { environment } from 'src/environments/environment';

import { SidenavComponent } from './sidenav.component';
import { SidenavModule } from './sidenav.module';

describe('Sidenav: Component ', () => {
    let fixture: ComponentFixture<SidenavComponent>;
    let sidenav: SidenavComponent;
    let loader: HarnessLoader;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                SharedModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient],
                    },
                    useDefaultLang: true,
                }),
                StoreModule.forRoot({ app: appReducer }),
                EffectsModule.forRoot([]),
                SidenavModule,
            ],
            providers: [
                { provide: ENVIRONMENT, useValue: environment },
                { provide: LOCALE_ID, useValue: Language.Spanish },
                provideHttpClient(withInterceptorsFromDi()),
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(SidenavComponent);
        sidenav = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should create the sidenav', () => {
        expect(sidenav).toBeTruthy();
    });
    it('should open top sidenav', async () => {
        const toggleSidenavBtn = await loader.getHarness(MatButtonHarness.with({ selector: '.sidenav-top-menu__toolbar__menu' }));
        await toggleSidenavBtn.click();
        const sidenav = await loader.getHarness(MatSidenavHarness.with({ selector: '#sidenav' }));
        const isOpen = await sidenav.isOpen();
        expect(isOpen).toBe(true);
    });
    it('should close top sidenav', async () => {
        const toggleSidenavBtn = await loader.getHarness(MatButtonHarness.with({ selector: '.sidenav-top-menu__toolbar__menu' }));
        await toggleSidenavBtn.click();
        await toggleSidenavBtn.click();
        const sidenav = await loader.getHarness(MatSidenavHarness.with({ selector: '#sidenav' }));
        const isOpen = await sidenav.isOpen();
        expect(isOpen).toBe(false);
    });
});
