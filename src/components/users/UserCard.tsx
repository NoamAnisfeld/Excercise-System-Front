import ItemCard from "../ItemCard"
import type { UserInfo } from "../../requests/schemas"

export default function UserCard({
    username,
    first_name,
    last_name,
    linkTo,
}: UserInfo & {
    linkTo: string,
}) {
    return <ItemCard
        title={username || 'ללא שם משתמש'}
        description={`${first_name} ${last_name}`}
        linkTo={linkTo}
    />
}