import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { setTopModule } from '@app/store/actions/app.actions';
import { ModuleCode, ModuleLink } from '@core/models/module.model';
import { Store } from '@ngrx/store';
import { firstValueFrom, of } from 'rxjs';
import { setActiveModuleResolver } from './active-module.resolver';

describe('setActiveModuleResolver', () => {
    let store: jasmine.SpyObj<Store>;

    beforeEach(() => {
        store = jasmine.createSpyObj<Store>('Store', ['select', 'dispatch']);

        TestBed.configureTestingModule({
            providers: [{ provide: Store, useValue: store }],
        });
    });

    it('returns null when the url is empty', () => {
        const result = TestBed.runInInjectionContext(() =>
            setActiveModuleResolver({} as ActivatedRouteSnapshot, { url: '' } as RouterStateSnapshot)
        );

        expect(result).toBeNull();
    });

    it('selects and dispatches the active module', async () => {
        const module = { code: ModuleCode.Curriculum, link: ModuleLink.Curriculum };
        store.select.and.returnValue(of([module]) as never);

        const result = TestBed.runInInjectionContext(() =>
            setActiveModuleResolver({} as ActivatedRouteSnapshot, { url: '/curriculum' } as RouterStateSnapshot)
        );

        await expectAsync(firstValueFrom(result as never)).toBeResolvedTo(module as never);
        expect(store.dispatch).toHaveBeenCalledWith(setTopModule({ module }));
    });
});
