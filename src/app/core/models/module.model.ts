export enum ModuleLink {
    Home = '',
}

export enum ModuleCode {
    Home = 'home',
}

export interface Module {
    parentId?: number;
    code: ModuleCode;
    link?: ModuleLink | string;
    icon: string;
    modules?: Module[];
}
