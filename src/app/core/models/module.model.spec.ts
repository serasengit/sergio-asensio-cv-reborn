import { Module, ModuleCode, ModuleLink, findModuleByUrl } from './module.model';

describe('module.model', () => {
    const modules: Module[] = [
        {
            code: ModuleCode.Introduction,
            link: ModuleLink.Introduction,
        },
        {
            code: ModuleCode.Curriculum,
            link: ModuleLink.Curriculum,
            modules: [
                {
                    code: ModuleCode.Profile,
                    link: ModuleLink.Profile,
                },
            ],
        },
    ];

    it('finds a top-level module by url', () => {
        expect(findModuleByUrl('/introduction', modules)).toEqual(modules[0]);
    });

    it('finds a nested module by url', () => {
        expect(findModuleByUrl('/curriculum/profile', modules)).toEqual(modules[1]);
    });

    it('returns undefined when no module matches', () => {
        expect(findModuleByUrl('/unknown', modules)).toBeUndefined();
    });
});
