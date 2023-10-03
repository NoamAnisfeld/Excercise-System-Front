import NavBar from "../components/NavBar"
import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import {
    useAppSelector,
    useResumeApiSession,
    useLogout,
} from "../hooks"

export default function MainView() {

    useResumeApiSession();

    const { username } = useAppSelector(({ userdata }) => userdata);
    const logout = useLogout();


    return (
        <>
            <NavBar
                username={username}
                onLogout={logout}
            />
            <Box
                pt={5}
                px={{sm: 5, md: 10}}
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