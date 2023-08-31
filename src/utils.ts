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