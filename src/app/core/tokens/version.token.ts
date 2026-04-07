import { InjectionToken } from '@angular/core';
import json from 'package.json';

export const VERSION = new InjectionToken<string>('version', {
    factory: (): string => json.version,
});
