import { Grid } from "@mui/material"
import FadeIn from "../components/FadeIn"
import MainOptionsButton from "../components/MainOptionsButton";

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