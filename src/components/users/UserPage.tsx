import { useQuery } from "@tanstack/react-query"
import { fetchUserInfo } from "../../requests/fetchers"

import PageHeader from "../PageHeader";
import FadeIn from "../FadeIn"
import UserDetails from "./UserDetails";

export default function UserPage({
    id
}: {
    id: number,
}) {

    const { data: user, isError, isPending } = useQuery({
        queryKey: ['users', id],
        queryFn: () => fetchUserInfo(id),
    });

    if (isError) {
        throw new Error('Failed to fetch user info');
    }
    if (isPending) {
        return <>טוען נתונים...</>
    }

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