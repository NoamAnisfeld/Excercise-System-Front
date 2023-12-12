import {
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material'
import type { SubmissionInfo } from "../requests/schemas"
import { formatDateTime } from '../utils'
import EditableText from './EditableText'
import { updateSubmissionComment } from '../requests/actions'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks'

export default function SubmissionDetails({
    comment,
    created_at,
    updated_at,
    id,
    assignment,
    user,
}: SubmissionInfo) {

    const userIsStaff = useAppSelector(({ userdata }) => userdata.isStaff);
    const navigate = useNavigate();

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
                    <TableCell>
                        {userIsStaff ?
                        <EditableText
                            currentText={comment || ''}
                            placeholderText='טרם ניתן משוב'
                            onSave={async (newComment) => {
                                await updateSubmissionComment(
                                    newComment,
                                    id,
                                    assignment,
                                    user,
                                );
                                navigate('.');
                            }}
                        />
                        :
                        (comment || '-')
                    }
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}