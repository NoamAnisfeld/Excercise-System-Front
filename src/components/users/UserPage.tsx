import PageHeader from "../PageHeader";
import FadeIn from "../FadeIn"

import { useLoaderData } from "react-router-dom"
import type { UserInfo } from "../../requests/schemas"
import UserDetails from "./UserDetails";
export type UserPageData = UserInfo

export default function UserPage() {

    const user = useLoaderData() as UserInfo;

    return (
        <FadeIn>
            <PageHeader
                title={user.username || 'ללא שם משתמש'}
                subtitle={`${user.first_name} ${user.last_name}`}
            />
            <UserDetails {...user} />
        </FadeIn>
    );
}