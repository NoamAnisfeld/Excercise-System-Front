import { Card, CardActionArea, CardHeader, SxProps } from "@mui/material"
import { Link } from "react-router-dom"

export interface MainOptionsButtonProps {
    title: string,
    linkTo: string,
}

export default function MainOptionsButton({
    title,
    linkTo,
}: MainOptionsButtonProps) {

    const styles: SxProps = {
        borderRadius: '50%',
        width: 200,
        height: 200,
        mx: 3,
        my: 1,
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
            <CardActionArea component={Link} to={linkTo}>
                <CardHeader
                    title={title}
                    titleTypographyProps={{
                        textAlign: "center",
                        fontSize: "h4.fontSize",
                    }}
                />
            </CardActionArea>
        </Card>
    )
}