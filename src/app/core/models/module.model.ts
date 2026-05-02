export enum ModuleLink {
    Home = '',
    Introduction = 'introduction',
    Curriculum = 'curriculum',
    PersonalData = 'personal-data',
    Profile = 'profile',
    Education = 'education',
    Languages = 'languages',
    SoftwareTools = 'software-tools',
    WorkExperience = 'work-experience',
    TrainingCourses = 'training-courses',
    Certifications = 'certifications',
    Publications = 'publications',
    DownloadCV = 'download-cv',
}

export enum ModuleCode {
    Home = 'home',
    Introduction = 'introduction',
    Curriculum = 'curriculum',
    PersonalData = 'personal_data',
    Profile = 'profile',
    Education = 'education',
    Languages = 'languages',
    SoftwareTools = 'software_tools',
    WorkExperience = 'work_experience',
    TrainingCourses = 'training_courses',
    Certifications = 'certifications',
    Publications = 'publications',
    DownloadCV = 'download_cv',
}

export interface Module {
    id?: number;
    parentId?: number;
    code: ModuleCode;
    link?: ModuleLink | string;
    icon?: string;
    order?: number;
    modules?: Module[];
}

export function findModuleByUrl(url: string, modules: Module[] = []): Module | undefined {
    let foundModule: Module;
    const modulesWithLink = modules.filter((module) => module.link);
    for (const module of modulesWithLink) {
        if (url.includes(module.link)) {
            foundModule = module;
            break;
        }
        if (module.modules?.length) {
            foundModule = findModuleByUrl(url, module.modules);
            if (foundModule) break;
        }
    }
    return foundModule;
}
