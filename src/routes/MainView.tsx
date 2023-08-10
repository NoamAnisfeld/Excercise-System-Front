import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MainView() {

  const username = useAppSelector(({ userdata }) => userdata.username);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username)
      navigate('/login');
  }, [username]);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}