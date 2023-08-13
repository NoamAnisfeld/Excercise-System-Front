import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks";
import { dispatchUsername } from "../global-state/userdata";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MainView() {

  const username = useAppSelector(({ userdata }) => userdata.username);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username)
      navigate('/login');
  }, [username]);

  return (
    <>
      <NavBar username={username} setUsername={newUsername => dispatch(dispatchUsername(newUsername))} />
      <Outlet />
    </>
  )
}