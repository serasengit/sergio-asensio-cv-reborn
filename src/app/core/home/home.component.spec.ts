import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    it('creates the component', async () => {
        TestBed.overrideComponent(HomeComponent, {
            set: { template: '' },
        });

        await TestBed.configureTestingModule({
            imports: [HomeComponent],
        }).compileComponents();

        const fixture = TestBed.createComponent(HomeComponent);

        expect(fixture.componentInstance).toBeTruthy();
    });
});
