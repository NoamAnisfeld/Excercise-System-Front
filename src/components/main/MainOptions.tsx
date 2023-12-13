import { Grid } from "@mui/material"
import FadeIn from "../FadeIn"
import MainOptionsButton from "./MainOptionsButton";
import { useUserIsStaff } from "../../hooks";

export default function MainOptions() {

    const userIsStaff = useUserIsStaff();

    return (
        <FadeIn>
            <Grid container justifyContent="center" p={1}>
                <Grid item>
                    <MainOptionsButton title="כל הקורסים" linkTo="courses" />
                </Grid>
                <Grid item>
                    <MainOptionsButton title="כל התרגילים" linkTo="assignments" />
                </Grid>
                <Grid item>
                    <MainOptionsButton title="כל ההגשות" linkTo="submissions" />
                </Grid>
                {userIsStaff ?
                    <Grid item>
                        <MainOptionsButton title="כל המשתמשים" linkTo="users" />
                    </Grid>
                    :
                    undefined
                }
            </Grid>
        </FadeIn>
    );
}