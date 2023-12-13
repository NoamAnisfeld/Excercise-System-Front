import PageHeader from "../PageHeader";
import CardStack from "../CardStack"
import UserCard from "./UserCard"
import FadeIn from "../FadeIn"

import { useLoaderData } from "react-router-dom"
import type { Users } from "../../requests/schemas"
export type UsersInfo = Users;

export default function AllUsers() {

    const usersInfo = useLoaderData() as UsersInfo;

    return (
        <FadeIn>
            <PageHeader title="כל המשתמשים" />
            <CardStack>
                {usersInfo.map(user => <UserCard
                    {...user}
                    linkTo={String(user.id)}
                    key={user.id}
                />)}
            </CardStack>
        </FadeIn>
    );
}