import { Card, CardActionArea, CardHeader, CardContent, Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

export default function ItemCard({
    title,
    description,
    linkTo,
}: {
    title: string,
    description: string | React.ReactNode | null,
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
                {description ?
                    typeof description === 'string' ?
                        <CardContent>
                            <Typography>{description}</Typography>
                        </CardContent>
                        :
                        description
                    :
                    undefined
                }
            </CardActionArea>
        </Card>
    )
}