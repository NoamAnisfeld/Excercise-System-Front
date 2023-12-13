import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './global-state/store'
import { logUserIn, logUserOut, reportError } from './global-state/userdata'
import {
    getApiSession,
    LoginCredentials,
    InvalidTokenError
} from './requests/auth'
import { fetchUserInfo } from './requests/fetchers'
import { UserInfo } from './requests/schemas'
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
        const {
            longtermSessionToken,
            tokenClaims: {
                user_id,
                role
            }
        } = await apiSession.login(credentials);

        setStorageItem(API_SESSION_TOKEN_STORAGE_KEY, longtermSessionToken);

        const userInfo = await fetchUserInfo(user_id);
        dispatch(logUserIn({ ...userInfo, isStaff: role === 'admin' }));
        navigate('/');
    }
}


export function useLogout(): () => void {
    const dispatch = useAppDispatch();

    return () => {

        const apiSession = getApiSession();
        apiSession.logout();
        removeStorageItem(API_SESSION_TOKEN_STORAGE_KEY);
        dispatch(logUserOut());
    }
}


export function useResumeApiSession() {

    const { loginStatus } = useAppSelector(state => state.userdata)
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {

            if (loginStatus !== 'uninitialized')
                return;            

            const apiSession = getApiSession();
            const apiSessionToken = getStorageItem(API_SESSION_TOKEN_STORAGE_KEY);

            if (apiSession.isLoggedIn())
                return;

            if (!apiSessionToken) {
                apiSession.doNotExpectSessionResume();
                dispatch(logUserOut());
                return;
            }

            try {
                const {
                    tokenClaims: {
                        user_id,
                        role
                    }
                } = await apiSession.resumeSession(apiSessionToken);
                const userInfo = await fetchUserInfo(user_id);
                dispatch(logUserIn({ ...userInfo, isStaff: role === 'admin' }));

            } catch (e) {
                if (e instanceof InvalidTokenError) {
                    dispatch(logUserOut());
                } else {
                    dispatch(reportError());
                }
            }
        })();
    }, [loginStatus]);
}


export function useReloadRoute() {
    const navigate = useNavigate();
    return () => navigate('.', { replace: true });
}


export function useViewerIsStaff() {
    return useAppSelector(({ userdata }) => userdata.isStaff);
}


export function useGetUserInfo(userId: number) {

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        (async () => {
            setUserInfo(await fetchUserInfo(userId));
        })();
    }, [userId])

    return userInfo;
}