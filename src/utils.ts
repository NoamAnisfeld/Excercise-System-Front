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

export function formatDate(datetime: Date) {
    const _ = datetime;
    return `${_.getDate()}/${_.getMonth() + 1}/${_.getFullYear() % 100}`;
}

export function formatTime(datetime: Date) {
    const _ = datetime;
    return `${_.getHours()}:${String(_.getMinutes()).padStart(2, '0')}`;
}

export function formatDateTime(datetime: Date) {
    return `${formatDate(datetime)} ${formatTime(datetime)}`;
}