import { EnvironmentType } from './environment.model';

describe('environment.model', () => {
    it('exposes the expected environment type values', () => {
        expect(EnvironmentType.Development).toBe('dev');
        expect(EnvironmentType.Docker).toBe('docker');
        expect(EnvironmentType.PreProduction).toBe('pre');
        expect(EnvironmentType.Production).toBe('prod');
    });
});
