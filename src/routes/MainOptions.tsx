import { Grid } from "@mui/material"
import MyCoursesButton from "../components/MyCoursesButton"

export default function MainOptions() {
    return (
        <Grid container justifyContent="center">
            <Grid item>
                <MyCoursesButton />
            </Grid>
        </Grid>
    );
}