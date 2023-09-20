import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './global-state/store'
import { HTTP } from './utils'
import { updateUsername } from './global-state/userdata'
import { useNavigate } from 'react-router-dom'

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface LoginData {
    email: string,
    password: string,
}

export function useLogin() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return async ({
        email,
        password,
    }: LoginData) => {

        const request = await fetch('/api/login/', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
        });

        if (request.ok) {
            dispatch(updateUsername(email));
            navigate('/');
            return { email };
        } else if (request.status === HTTP.Unauthorized) {
            throw Error('פרטי הכניסה אינם תואמים');
        } else {
            throw Error();
        }
    }
}

export function useLogout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return async () => {
        dispatch(updateUsername(''));
        navigate('/');
    }
}