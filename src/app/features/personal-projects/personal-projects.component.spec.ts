import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PersonalProjectsComponent } from './personal-projects.component';

describe('PersonalProjectsComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PersonalProjectsComponent, TranslateModule.forRoot()],
        }).compileComponents();
    });

    it('creates the component', () => {
        const fixture = TestBed.createComponent(PersonalProjectsComponent);

        expect(fixture.componentInstance).toBeTruthy();
    });

    it('defines the expected public GitHub projects', () => {
        const fixture = TestBed.createComponent(PersonalProjectsComponent);
        const component = fixture.componentInstance;

        expect(component.projects).toEqual([
            { code: 'flutter_base_app', repoUrl: 'https://github.com/serasengit/flutter-base-app' },
            { code: 'node_base_app', repoUrl: 'https://github.com/serasengit/node-base-app' },
            { code: 'sergio_asensio_cv_reborn', repoUrl: 'https://github.com/serasengit/sergio-asensio-cv-reborn' },
        ]);
    });

    it('renders one card and repository link per project', () => {
        const fixture = TestBed.createComponent(PersonalProjectsComponent);
        fixture.detectChanges();

        const host: HTMLElement = fixture.nativeElement;
        const cards = host.querySelectorAll('.personal-projects__card');
        const repoLinks = host.querySelectorAll<HTMLAnchorElement>('.personal-projects__repo-link');

        expect(cards.length).toBe(3);
        expect(repoLinks.length).toBe(3);
        expect(Array.from(repoLinks).map((link) => link.getAttribute('href'))).toEqual([
            'https://github.com/serasengit/flutter-base-app',
            'https://github.com/serasengit/node-base-app',
            'https://github.com/serasengit/sergio-asensio-cv-reborn',
        ]);
        expect(Array.from(repoLinks).every((link) => link.getAttribute('target') === '_blank')).toBeTrue();
        expect(Array.from(repoLinks).every((link) => link.getAttribute('rel') === 'noopener noreferrer')).toBeTrue();
    });

    it('renders the expected technology icons and highlight lists for all projects', () => {
        const fixture = TestBed.createComponent(PersonalProjectsComponent);
        fixture.detectChanges();

        const host: HTMLElement = fixture.nativeElement;
        const flutterIcon = host.querySelector('.fa-flutter');
        const nodeIcon = host.querySelector('.fa-node-js');
        const angularIcon = host.querySelector('.fa-angular');
        const highlightLists = host.querySelectorAll('.personal-projects__list');
        const highlightItems = host.querySelectorAll('.personal-projects__list li');

        expect(flutterIcon).withContext('Flutter project icon should be rendered').not.toBeNull();
        expect(nodeIcon).withContext('Node.js project icon should be rendered').not.toBeNull();
        expect(angularIcon).withContext('Angular project icon should be rendered').not.toBeNull();
        expect(highlightLists.length).toBe(3);
        expect(highlightItems.length).toBe(12);
    });

    it('renders translation keys for the section headings before translations are loaded', () => {
        const fixture = TestBed.createComponent(PersonalProjectsComponent);
        fixture.detectChanges();

        const text = fixture.nativeElement.textContent as string;

        expect(text).toContain('personal_projects_page.title');
        expect(text).toContain('personal_projects_page.overview_title');
        expect(text).toContain('personal_projects_page.highlights_title');
        expect(text).toContain('personal_projects_page.stack_title');
        expect(text).toContain('personal_projects_page.architecture_title');
        expect(text).toContain('personal_projects_page.quality_title');
    });
});
