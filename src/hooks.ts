import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './global-state/store'
import { HTTP } from './utils'
import { updateUsername } from './global-state/userdata'
import { useNavigate } from 'react-router-dom'

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface LoginData {
    username: string,
}

export function useLogin() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return async ({
        username
    }: LoginData) => {

        if (!username) {
            throw Error('Username cannot be empty');
        } else {
            const request = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                }),
            });

            if (request.ok) {
                dispatch(updateUsername());
                navigate('/');
                return { username };
            } else if (request.status === HTTP.Unauthorized) {
                throw Error('פרטי הכניסה אינם תואמים. נסו את שם המשתמש הזמני developer');
            } else {
                throw Error();
            }
        }
    }
}

export function useLogout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return async () => {
        const request = await fetch('/logout', {
            method: 'POST',
        });

        if (request.ok) {
            dispatch(updateUsername());
            navigate('/');
        } else {
            throw Error();
        }   
    }
}