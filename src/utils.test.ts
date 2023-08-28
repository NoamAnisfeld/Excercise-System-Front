import { describe, it, expect, beforeEach } from 'vitest'
import 'global-jsdom'
import { getCookie } from './utils'

beforeEach(() => { document.cookie = '' });

describe('getCookie function', () => {
    it('should return the value of the existing cookie', () => {
        document.cookie = 'cookie1=value1; cookie2=value2';
        expect(getCookie('cookie1')).toBe('value1');
    });

    it('should return undefined for a non-existing cookie', () => {
        document.cookie = 'cookie1=value1; cookie2=value2';
        expect(getCookie('nonexistentCookie')).toBe(undefined);
    });

    it('should handle cookies with special characters', () => {
        document.cookie = 'cookie1=special=value; cookie2=another=value';
        expect(getCookie('cookie1')).toBe('special=value');
    });
});
