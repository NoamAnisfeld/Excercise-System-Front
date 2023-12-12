import { Outlet } from "react-router-dom"
import { useAppSelector } from "../../hooks"

export default function AppLayout() {

    const { loginStatus } = useAppSelector(({ userdata }) => userdata);

    if (loginStatus === 'uninitialized') {
        return (
            <p>
                'מנסה להתחבר...'
            </p>
        );
    } else if (loginStatus === 'error' || loginStatus === 'loggedOut') {
        return (
            <p>
                {"שגיאת התחברות. בדקו את החיבור לאינטרנט ונסו "}
                <a href="/login" style={{ all: 'revert' }}>להתחבר מחדש</a>
            </p>
        );
    } else {
        return <Outlet />
    }
}