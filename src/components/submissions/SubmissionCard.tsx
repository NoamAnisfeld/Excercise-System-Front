import ItemCard from "../ItemCard"
import type { SubmissionInfo } from "../../requests/schemas"
import { formatDateTime } from "../../utils"
import { useGetUserInfo, useViewerIsStaff } from "../../hooks"

export default function SubmissionCard({
    created_at,
    user,
    comment,
    linkTo,
}: SubmissionInfo & {
    linkTo: string,
}) {

    const viewerIsStaff = useViewerIsStaff();
    const userInfo = useGetUserInfo(user);

    return <ItemCard
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
}