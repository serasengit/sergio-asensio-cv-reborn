export enum ModuleLink {
    Home = '',
    Curriculum = 'cv',
}

export enum ModuleCode {
    Home = 'home',
    Curriculum = 'cv',
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
    parentId?: number;
    code: ModuleCode;
    link?: ModuleLink | string;
    icon: string;
    modules?: Module[];
}
