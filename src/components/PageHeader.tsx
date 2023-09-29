import { Box, Typography } from "@mui/material"

interface PageHeaderProps {
    title: string,
    subtitle?: string
}

export default function PageHeader({
    title,
    subtitle
}: PageHeaderProps) {
    return <Box mb={5}>
        <Typography variant="h1" align="center">{title}</Typography>
        {subtitle ?
            <Typography variant="h4" component="p" width="fit-content" m="auto">
                {subtitle}
            </Typography>
            : undefined
        }
    </Box>

}