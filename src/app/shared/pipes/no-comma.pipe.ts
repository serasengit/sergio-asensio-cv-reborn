import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'noComma' })
export class NoCommaPipe implements PipeTransform {
    transform(value: string | string[] | null | undefined): string {
        if (Array.isArray(value)) {
            return value.join('');
        }
        return value ?? ''; // Handles null or undefined values gracefully
    }
}
