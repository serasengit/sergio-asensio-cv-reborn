import { TestBed } from '@angular/core/testing';
import { VERSION } from './version.token';

describe('VERSION token', () => {
    it('resolves the package version', () => {
        TestBed.configureTestingModule({});

        expect(TestBed.inject(VERSION)).toMatch(/^\d+\.\d+\.\d+/);
    });
});
