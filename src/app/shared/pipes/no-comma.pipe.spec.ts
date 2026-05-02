import { NoCommaPipe } from './no-comma.pipe';

describe('NoCommaPipe', () => {
    const pipe = new NoCommaPipe();

    it('returns joined text for string arrays', () => {
        expect(pipe.transform(['a', 'b', 'c'])).toBe('abc');
    });

    it('returns the original string value', () => {
        expect(pipe.transform('hello')).toBe('hello');
    });

    it('returns an empty string for nullish values', () => {
        expect(pipe.transform(null)).toBe('');
        expect(pipe.transform(undefined)).toBe('');
    });
});
