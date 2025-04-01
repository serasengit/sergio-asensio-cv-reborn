export enum ModuleLink {
    Home = '',
    Curriculum = 'cv',
}

export enum ModuleCode {
    Home = 'home',
    Curriculum = 'cv',
}

export interface Module {
    parentId?: number;
    code: ModuleCode;
    link?: ModuleLink | string;
    icon: string;
    modules?: Module[];
}
