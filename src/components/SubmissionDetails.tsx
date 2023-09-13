import { Table, TableRow, TableCell, Button } from '@mui/material'
import type { SubmissionInfo } from "../requests/schemes"
import { formatDateTime, formatDate } from '../utils';

export default function SubmissionDetails({
    sub_date,
    file,
    comment,
    created_at,
    updated_at,
}: SubmissionInfo) {
    return (
        <Table sx={{ width: "auto", margin: "auto" }}>
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
                <TableCell component="th">קובץ</TableCell>
                <TableCell><a href={file} download>{file}</a></TableCell>
            </TableRow>

            <TableRow>
                <TableCell component="th">משוב</TableCell>
                <TableCell>{comment}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell component="th">תאריך אחרון לעדכון</TableCell>
                <TableCell>
                    {new Date(sub_date) <= new Date() ?
                    <>
                        {formatDate(sub_date)}
                        <Button variant="contained" size="small" sx={{ mx: 2 }}>עדכון</Button>
                    </>
                    : 'עבר'}
                </TableCell>
            </TableRow>
        </Table>
    );
}