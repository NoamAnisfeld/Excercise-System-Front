import type { UserInfo } from "../../requests/schemas"
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material'
import ExternalLink from '@mui/material/Link'


export default function UserDetails({
    email
}: UserInfo) {

    return (
        <Table sx={{
            width: "auto",
            margin: "auto",
            '.MuiTableCell-root': {
                maxWidth: "50ch",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }
        }}>
            <TableBody>
                <TableRow>
                    <TableCell component="th">דואר אלקטרוני</TableCell>
                    <TableCell>
                        <ExternalLink href={`mailto:${email}`}>{email}</ExternalLink>
                    </TableCell>
                </TableRow>
           </TableBody>
        </Table>
    );
}