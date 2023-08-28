import { Card, CardActionArea, CardHeader, CardContent, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import type { Course } from "../requests/schemes"

export default function CourseCard({
    id,
    name,
    description,
}: Course) {
    return (
        <Card
            variant="elevation"
            sx={{
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                p: 2
            }}
        >
            <CardActionArea component={Link} to={String(id)}>
                <CardHeader
                    title={name}
                />
                <CardContent>
                    <Typography>{description}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}