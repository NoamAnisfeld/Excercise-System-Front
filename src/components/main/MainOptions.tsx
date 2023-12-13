import { Grid } from "@mui/material"
import FadeIn from "../FadeIn"
import MainOptionsButton from "./MainOptionsButton";
import { useViewerIsStaff } from "../../hooks";

export default function MainOptions() {

    const viewerIsStaff = useViewerIsStaff();

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
                {viewerIsStaff ?
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