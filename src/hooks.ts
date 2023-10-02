import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './global-state/store'
import { LoginCredentials } from './requests/auth'
import { getApiSession } from './requests/auth' 
import { updateUsername } from './global-state/userdata'
import { useNavigate } from 'react-router-dom'


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export function useLogin(): (credentials: LoginCredentials) => Promise<void> {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return async (credentials: LoginCredentials) => {

        const apiSession = getApiSession();
        await apiSession.login(credentials);
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
        dispatch(updateUsername(''));
        navigate('/login');
    }
}