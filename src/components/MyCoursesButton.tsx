import { Card, CardActionArea, CardHeader } from "@mui/material";

export default function MyCoursesButton() {

    return (
        <Card sx={{
            borderRadius: "50%",
            width: 250,
            height: 250,
            display: "flex",
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            boxShadow: 3,
        }}>
            <CardActionArea>
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