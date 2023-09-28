export const HTTP = {
    OK: 200,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,
} as const;


export function getCookie(cookieName: string) {
    const
        cookiesString = document.cookie,
        cookiesArray = cookiesString.split(/;\s*/),
        targetCookie = cookiesArray.find(str => str.startsWith(cookieName + '='));
    
    if (targetCookie !== undefined)
        return targetCookie.replace(cookieName + '=', '');
    
    return undefined;
}


function normalizeStorageKey(key: string) {
    return (import.meta.env.VITE_STORAGE_PREFIX || '') + key;
}


export function getStorageItem(key: string): ReturnType<typeof localStorage.getItem> {
    return localStorage.getItem(normalizeStorageKey(key));
}


export function setStorageItem(key: string, value: string): ReturnType<typeof localStorage.setItem> {
    localStorage.setItem(normalizeStorageKey(key), value);
}


export function removeStorageItem(key: string): ReturnType<typeof localStorage.removeItem> {
    localStorage.removeItem(normalizeStorageKey(key));
}


export function formatDate(datetime: Date | string | number) {
    const _ = new Date(datetime);
    return `${_.getDate()}/${_.getMonth() + 1}/${_.getFullYear() % 100}`;
}


export function formatTime(datetime: Date | string | number) {
    const _ = new Date(datetime);
    return `${_.getHours()}:${String(_.getMinutes()).padStart(2, '0')}`;
}


export function formatDateTime(datetime: Date | string | number) {
    return `${formatDate(datetime)} ${formatTime(datetime)}`;
}
