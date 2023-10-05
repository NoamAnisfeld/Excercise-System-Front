import {
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material'
import type { SubmissionInfo } from "../requests/schemes"
import { formatDateTime } from '../utils';

export default function SubmissionDetails({
    comment,
    created_at,
    updated_at,
}: SubmissionInfo) {
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
                    <TableCell component="th">הוגש בתאריך</TableCell>
                    <TableCell>{formatDateTime(created_at)}</TableCell>
                </TableRow>

                {updated_at !== created_at ?
                    <TableRow>
                        <TableCell component="th">עודכן בתאריך</TableCell>
                        <TableCell>{formatDateTime(updated_at)}</TableCell>
                    </TableRow>
                    : undefined}

                <TableRow>
                    <TableCell component="th">משוב</TableCell>
                    <TableCell>{comment || '-'}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}