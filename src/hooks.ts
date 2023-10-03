import { useEffect } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './global-state/store'
import { updateUserInfo, resetUserInfo, requireLogin } from './global-state/userdata'
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
import { fetchUserInfo } from './requests/fetchers'

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export function useLogin(): (credentials: LoginCredentials) => Promise<void> {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return async (credentials: LoginCredentials) => {

        const apiSession = getApiSession();
        const {
            longtermSessionToken,
            tokenClaims: {
                user_id,
                role
            }
        } = await apiSession.login(credentials);
        
        setStorageItem(API_SESSION_TOKEN_STORAGE_KEY, longtermSessionToken);
        
        const userInfo = await fetchUserInfo(user_id);
        dispatch(updateUserInfo({ ...userInfo, isStaff: role === 'admin' }));
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
        dispatch(resetUserInfo());
        navigate('/login');
    }
}


export function useResumeApiSession() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {

            const apiSessionToken = getStorageItem(API_SESSION_TOKEN_STORAGE_KEY);
            if (apiSessionToken) {
                const apiSession = getApiSession();
                if (apiSession.isLoggedIn())
                    return;

                try {
                    const {
                        tokenClaims: {
                            user_id,
                            role
                        }
                    } = await apiSession.resumeSession(apiSessionToken);
                    const userInfo = await fetchUserInfo(user_id);
                    dispatch(updateUserInfo({ ...userInfo, isStaff: role === 'admin' }));
                               
                } catch (e) {
                    if (e instanceof InvalidTokenError) {
                        dispatch(requireLogin());
                    } else {
                        // the issue might be temporary so assume the session is still valid
                        // TODO: Indicate to the user that there's an issue
                    }
                }
            } else {
                dispatch(requireLogin());
            }
        })();
    }, []);
}