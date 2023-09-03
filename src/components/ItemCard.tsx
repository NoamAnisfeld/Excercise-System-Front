import { Card, CardActionArea, CardHeader, CardContent, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function ItemCard({
    title,
    description,
    linkTo,
}: {
    title: string,
    description: string,
    linkTo: string,
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
            <CardActionArea component={Link} to={linkTo}>
                <CardHeader
                    title={title}
                />
                <CardContent>
                    <Typography>{description}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}