import { ENVIRONMENT } from './environment.token';

describe('ENVIRONMENT token', () => {
    it('has the expected token description', () => {
        expect(ENVIRONMENT.toString()).toContain('environment');
    });
});
