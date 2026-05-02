import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
    it('creates the component and keeps icon/title lists aligned', async () => {
        TestBed.overrideComponent(ProfileComponent, {
            set: { template: '' },
        });

        await TestBed.configureTestingModule({
            imports: [ProfileComponent, TranslateModule.forRoot()],
        }).compileComponents();

        const fixture = TestBed.createComponent(ProfileComponent);

        expect(fixture.componentInstance).toBeTruthy();
        expect(fixture.componentInstance.profileIcons.length).toBe(fixture.componentInstance.profileTitleKeys.length);
    });
});
