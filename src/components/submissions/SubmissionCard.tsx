import ItemCard from "../ItemCard"
import SubmissionDetails from "./SubmissionDetails"
import type { SubmissionInfo } from "../../requests/schemas"
import { formatDateTime } from "../../utils"
import { useGetUserInfo, useViewerIsStaff } from "../../hooks"
import { useLocation } from "react-router-dom"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"

export default function SubmissionCard({
    linkTo,
    ...submission
}: SubmissionInfo & {
    linkTo: string,
}) {

    const {
        id,
        created_at,
        user,
        comment,
    } = submission;
    const viewerIsStaff = useViewerIsStaff();
    const userInfo = useGetUserInfo(user);
    const { hash } = useLocation();

    return (
        <Box>
            <ItemCard
                title={`הוגש ב-${formatDateTime(new Date(created_at))}`}
                description={
                    viewerIsStaff ?
                        userInfo ?
                            `${userInfo.first_name} ${userInfo.last_name}`
                            :
                            undefined
                        :
                        comment ?
                            `משוב: ${comment}`
                            :
                            undefined
                }
                linkTo={linkTo}
            />
            <Collapse in={hash === `#submission-${id}`}>
                <SubmissionDetails {...submission} />
            </Collapse>
        </Box>
    )
}