import { Stack } from "@mui/material"

export default function CardStack({ children }: React.PropsWithChildren) {
    return <Stack spacing={5} maxWidth={600} margin="auto">
        {children}
    </Stack>
}