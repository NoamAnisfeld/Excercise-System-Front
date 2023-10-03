import { useEffect } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './global-state/store'
import { updateUsername } from './global-state/userdata'
import { useNavigate } from 'react-router-dom'
import {
    getApiSession,
    LoginCredentials,
    InvalidTokenError
} from './requests/auth'
import {
    API_SESSION_TOKEN_STORAGE_KEY,
    getStorageItem,
    setStorageItem,
    removeStorageItem,
} from './utils'

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export function useLogin(): (credentials: LoginCredentials) => Promise<void> {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return async (credentials: LoginCredentials) => {

        const apiSession = getApiSession();
        const { longtermSessionToken } = await apiSession.login(credentials);
        setStorageItem(API_SESSION_TOKEN_STORAGE_KEY, longtermSessionToken);
        dispatch(updateUsername(credentials.email));
        navigate('/');
    }
}


export function useLogout(): () => void {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return () => {

        const apiSession = getApiSession();
        apiSession.logout();
        removeStorageItem(API_SESSION_TOKEN_STORAGE_KEY);
        dispatch(updateUsername(''));
        navigate('/login');
    }
}


export function useResumeApiSession() {

    const logout = useLogout();

    useEffect(() => {
        (async () => {

            const apiSessionToken = getStorageItem(API_SESSION_TOKEN_STORAGE_KEY);
            if (apiSessionToken) {
                const apiSession = getApiSession();
                try {
                    await apiSession.resumeSession(apiSessionToken);
                } catch (e) {
                    if (e instanceof InvalidTokenError) {
                        logout();
                    } else {
                        // the issue might be temporary so assume the session is still valid
                        // TODO: Indicate to the user that there's an issue
                    }
                }
            }
        })();
    }, []);
}