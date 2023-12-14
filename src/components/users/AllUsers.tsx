import { useState } from "react";
import { useLoaderData } from "react-router-dom"
import { useReloadRoute } from "../../hooks"

import PageHeader from "../PageHeader";
import CardStack from "../CardStack"
import UserCard from "./UserCard"
import FadeIn from "../FadeIn"
import Button from "@mui/material/Button"

import UserDetailsDialog from "./UserDetailsDialog";
import { createUser } from "../../requests/actions";
import type { Users } from "../../requests/schemas"
export type UsersInfo = Users;


export default function AllUsers() {

    const usersInfo = useLoaderData() as UsersInfo;
    const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);
    const reload = useReloadRoute();

    return (
        <FadeIn>
            <PageHeader title="כל המשתמשים" />
            <Button
                variant="contained"
                onClick={() => setShowCreateUserDialog(true)}
            >
                יצירת משתמש חדש
            </Button>
            {
                showCreateUserDialog ?
                    <UserDetailsDialog
                        onSave={async (info) => {
                            await createUser(info);
                            setShowCreateUserDialog(false);
                            reload();
                        }}
                        onClose={() => setShowCreateUserDialog(false)}
                    />
                    :
                    undefined
            }
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