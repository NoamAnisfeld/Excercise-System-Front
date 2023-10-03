import { useEffect } from "react"
import NavBar from "../components/NavBar"
import { Box } from "@mui/material"
import { Outlet, useNavigate } from "react-router-dom"
import {
    useAppSelector,
    useLogout,
} from "../hooks"

export default function MainView() {

    const { requiresLogin, first_name } = useAppSelector(({ userdata }) => userdata);
    const navigate = useNavigate();
    const logout = useLogout();

    useEffect(() => {
        if (requiresLogin)
            navigate('/login');
    }, [requiresLogin]);

    return (
        <>
            <NavBar
                username={first_name}
                onLogout={logout}
            />
            <Box
                pt={5}
                px={{ sm: 5, md: 10 }}
                m="auto"
                width="fit-content"
                maxWidth="min(100%, 560px)"
                boxSizing="content-box" // so that the max-width isn't affected my padding
                overflow="auto"
            >
                <Outlet />
            </Box>
        </>
    )
}