import { Stack } from "@mui/material"

export default function CardStack({ children }: React.PropsWithChildren) {
    return <Stack spacing={5} mt={5} mx="auto" maxWidth={600}>
        {children}
    </Stack>
}