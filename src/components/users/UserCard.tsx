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
        title={`${first_name} ${last_name}`}
        description={username || '(אין שם משתמש)'}
        linkTo={linkTo}
    />
}