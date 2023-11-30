import { Grid } from "@mui/material"
import MyCoursesButton from "../components/MyCoursesButton"
import FadeIn from "../components/FadeIn"

export default function MainOptions() {
    return (
        <FadeIn>
            <Grid container justifyContent="center">
                <Grid item>
                    <MyCoursesButton />
                </Grid>
            </Grid>
        </FadeIn>
    );
}