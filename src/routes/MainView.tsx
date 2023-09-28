import { useEffect } from "react"
import NavBar from "../components/NavBar"
import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import { apiSession } from "../appAuth"
import { useAppSelector, useLogout } from "../hooks"
import { useNavigate } from "react-router-dom"

export default function MainView() {

    const { username } = useAppSelector(({ userdata }) => userdata);
    const logout = useLogout();
    const navigate = useNavigate();

    useEffect(() => {
        if (!apiSession || !apiSession.isLoggedIn())
            navigate('/login');
    }, [username]);

    return (
        <>
            <NavBar
                username={username}
                onLogout={logout}
            />
            <Box p={10}>
                <Outlet />
            </Box>
        </>
    )
}