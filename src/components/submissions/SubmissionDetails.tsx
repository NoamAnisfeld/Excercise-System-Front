import type { SubmissionInfo } from "../../requests/schemas"
import { updateSubmissionComment } from '../../requests/actions'
import { formatDateTime } from '../../utils'
import { useReloadRoute, useViewerIsStaff } from '../../hooks'
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material'
import EditableText from '../EditableText'
import EditableNumber from "../EditableNumber"


export default function SubmissionDetails({
    created_at,
    updated_at,
    score,
    comment,
    id,
    assignment,
    user,
}: SubmissionInfo) {

    const viewerIsStaff = useViewerIsStaff();
    const reload = useReloadRoute();

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
                    <TableCell component="th">ציון</TableCell>
                    <TableCell>
                        <EditableNumber
                            editable={viewerIsStaff}
                            currentValue={score}
                            placeholderValue='טרם ניתן ציון'
                            onSave={async (newScore) => {
                                await updateSubmissionComment(
                                    { score: newScore },
                                    id,
                                    assignment,
                                    user,
                                );
                                reload();
                            }}
                        />
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell component="th">משוב</TableCell>
                    <TableCell>
                        <EditableText
                            editable={viewerIsStaff}
                            currentText={comment || ''}
                            placeholderText='לא ניתן משוב'
                            onSave={async (newComment) => {
                                await updateSubmissionComment(
                                    { comment: newComment },
                                    id,
                                    assignment,
                                    user,
                                );
                                reload();
                            }}
                        />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}