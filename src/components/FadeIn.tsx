import { Fade, Box } from '@mui/material'

export default function FadeIn({
    children,
    in: inProp = true,
}: React.PropsWithChildren & {
    in?: boolean,
}) {
    return <Fade in={inProp}>
        <Box>
            {children}
        </Box>
    </Fade>
}