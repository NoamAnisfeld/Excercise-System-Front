import {
    tokensScheme,
    refreshedTokensScheme,
} from "./schemes"
import {
    API_BASE_URL,
    HTTP,
    getStorageItem,
    setStorageItem,
    removeStorageItem,
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


const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';


export class ApiSession {

    #accessToken: string | null = null
    #refreshToken: string | null = getStorageItem(REFRESH_TOKEN_STORAGE_KEY)

    
    #updateAccessToken(token: string | null) {
        this.#accessToken = token;
    }


    #updateRefreshToken(token: string | null) {
        this.#refreshToken = token;
        if (token) {
            setStorageItem(REFRESH_TOKEN_STORAGE_KEY, token);
        } else {
            removeStorageItem(REFRESH_TOKEN_STORAGE_KEY);
        }
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
        const validatedData = tokensScheme.parse(json);

        this.#updateAccessToken(validatedData.access);
        this.#updateRefreshToken(validatedData.refresh);
    }


    logout() {
        this.#updateAccessToken(null);
        this.#updateRefreshToken(null);
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
            throw new InvalidTokenError('No refresh token is stored');

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
            this.#updateRefreshToken(null);
            throw new InvalidTokenError('Refresh token has been declined');
        }

        if (!response.ok)
            throw new Error('Token refresh error');

        const json = await response.json();
        const validatedData = refreshedTokensScheme.parse(json);

        this.#updateAccessToken(validatedData.access);
    }
}