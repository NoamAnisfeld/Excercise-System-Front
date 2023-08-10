import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function MainView() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}