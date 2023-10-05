import {
    Button,
    ButtonProps,
    InputLabel,
} from "@mui/material";


export function InputLabelStyledAsButton(
    props: ButtonProps<typeof InputLabel> & React.PropsWithChildren & { component?: never }
) {
    return <Button {...props} component={InputLabel} />
}