import {
    apiTokensScheme,
    refreshedApiTokensScheme,
} from "./schemes"
import {
    API_BASE_URL,
    HTTP,
} from "../utils"


export interface LoginCredentials {
    email: string,
    password: string,
}


export class InvalidCredentialsError extends Error {
    constructor(...args: Parameters<typeof Error>) {
        super(...args);
        this.name = "InvalidCredentialsError";
    }
}
export class InvalidTokenError extends Error {
    constructor(...args: Parameters<typeof Error>) {
        super(...args);
        this.name = "InvalidTokenError";
    }
}


class ApiSession {

    #accessToken: string | null = null
    #refreshToken: string | null = null

    
    #updateAccessToken(token: string | null) {
        this.#accessToken = token;
    }


    #updateRefreshToken(token: string | null) {
        this.#refreshToken = token;
    }


    isLoggedIn() {
        return Boolean(this.#refreshToken);
    }


    async login(credentials: LoginCredentials) {

        const response = await fetch(API_BASE_URL + '/token/', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(credentials),
        });

        if (response.status === HTTP.Unauthorized)
            throw new InvalidCredentialsError('Invalid credentials');

        if (!response.ok)
            throw Error('Login error');

        const json = await response.json();
        const validatedData = apiTokensScheme.parse(json);

        this.#updateAccessToken(validatedData.access);
        this.#updateRefreshToken(validatedData.refresh);

        return {
            longtermSessionToken: validatedData.refresh
        }
    }


    logout() {
        this.#updateAccessToken(null);
        this.#updateRefreshToken(null);
    }


    async resumeSession(longtermSessionToken: string) {

        this.#refreshToken = longtermSessionToken;
        return await this.refreshTokens();
    }


    async getAccessToken() {

        if (this.#accessToken) {
            return this.#accessToken;
        } else {
            await this.refreshTokens();
            if (this.#accessToken) {
                return this.#accessToken;
            } else {
                throw new InvalidTokenError('Unexpected issue with access token. Try logout and login back');
            }
        }
    }


    async refreshTokens() {
        if (!this.#refreshToken)
            throw new InvalidTokenError('User is not logged in');

        const response = await fetch(API_BASE_URL + '/token/refresh/', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                refresh: this.#refreshToken
            }),
        });

        if (response.status === HTTP.Unauthorized) {
            this.logout();
            throw new InvalidTokenError('Session token is expired or invalid. User has been logged out');
        }

        if (!response.ok) {
            let text = '';
            try {
                text = await response.text();
            } finally {
                throw new Error(`Token refresh error - server responded with HTTP ${response.status}${text ? ': ' + text : ''}`);                
            }
        }

        const json = await response.json();
        const validatedData = refreshedApiTokensScheme.parse(json);

        this.#updateAccessToken(validatedData.access);
    }
}


let apiSession = new ApiSession();


export function getApiSession() {
    return apiSession;
}


export function resetApiSession() {
    apiSession = new ApiSession();
    return apiSession;
}