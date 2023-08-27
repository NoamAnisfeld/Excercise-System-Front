import { Card, CardActionArea, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";

export default function CourseCard({
    id,
    name,
}: {
    id: string,
    name: string,
}) {
    return (
        <Card
            variant="elevation"
            sx={{
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                p: 2
            }}
        >
            <CardActionArea component={Link} to={id}>
                <CardHeader
                    title={name}
                />
            </CardActionArea>
        </Card>
    )
}