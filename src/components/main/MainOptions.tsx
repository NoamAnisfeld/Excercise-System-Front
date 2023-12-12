import { Grid } from "@mui/material"
import FadeIn from "../FadeIn"
import MainOptionsButton from "./MainOptionsButton";

export default function MainOptions() {
    return (
        <FadeIn>
            <Grid container justifyContent="center" p={1}>
                <Grid item>
                    <MainOptionsButton title="הקורסים שלי" linkTo="my-courses" />
                </Grid>
                <Grid item>
                    <MainOptionsButton title="התרגילים שלי" linkTo="my-assignments" />
                </Grid>
                <Grid item>
                    <MainOptionsButton title="ההגשות שלי" linkTo="my-submissions" />
                </Grid>
            </Grid>
        </FadeIn>
    );
}