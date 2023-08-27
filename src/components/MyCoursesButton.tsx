import { Card, CardActionArea, CardHeader, SxProps } from "@mui/material"
import { Link } from "react-router-dom"

export default function MyCoursesButton() {

    const styles: SxProps = {
        borderRadius: '50%',
        width: 250,
        height: 250,
        display: 'flex',
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        boxShadow: 3,

        '.MuiCardActionArea-root': {
            display: 'flex',
        }
    };

    return (
        <Card sx={styles}>
            <CardActionArea component={Link} to="my-courses">
                <CardHeader
                    title="הקורסים שלי"
                    titleTypographyProps={{
                        textAlign: "center",
                        fontSize: "h3.fontSize",
                    }}
                />
            </CardActionArea>
        </Card>
    )
}