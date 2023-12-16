import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "../../requests/fetchers"
import { createUser } from "../../requests/actions"
import { useReloadRoute } from "../../hooks"

import Button from "@mui/material/Button"
import PageHeader from "../PageHeader";
import CardStack from "../CardStack"
import UserCard from "./UserCard"
import FadeIn from "../FadeIn"
import UserDetailsDialog from "./UserDetailsDialog";


export default function AllUsers() {

    const { data: usersInfo, isError, isPending } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });
    const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);
    const reload = useReloadRoute();

    if (isError) {
        throw new Error('Failed to fetch users');
    }
    if (isPending) {
        return <>טוען נתונים...</>
    }

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