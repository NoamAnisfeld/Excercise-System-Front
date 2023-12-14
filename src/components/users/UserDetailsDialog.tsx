import { useState } from "react"
import { Button, Dialog, DialogTitle, Box, Stack, TextField, Backdrop, CircularProgress } from "@mui/material"
import type { NewUserInfo } from "../../requests/actions"

interface UserDetailsDialogProps {
    onSave: (info: NewUserInfo) => void | Promise<void>,
    onClose: () => void,
}
export default function UserDetailsDialog({
    onSave,
    onClose,
}: UserDetailsDialogProps) {

    const [values, setValues] = useState<NewUserInfo>({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
    });
    const [defaultUsername, setDefaultUsername] = useState('');
    const [customUsername, setCustomUsername] = useState(false);
    const [waitingMode, setWaitingMode] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

        const newValues = { ...values, [e.target.name]: e.target.value };
        const newDefaultUsername = `${newValues.first_name} ${newValues.last_name}`;
        setDefaultUsername(newDefaultUsername);
        if (!customUsername) {
            newValues.username = newDefaultUsername;
        }
        setValues(newValues);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setWaitingMode(true);
        await onSave(values);
        setWaitingMode(false);
    }

    return (
        <>
            <Dialog open={true} onClose={onClose} autoFocus>
                <DialogTitle>פרטי משתמש</DialogTitle>
                <Box component="form" p={2} onSubmit={handleSubmit}>
                    <Stack gap={1}>
                        <TextField required autoFocus
                            label="שם פרטי"
                            name="first_name"
                            onChange={handleChange}
                        />
                        <TextField required
                            label="שם משפחה"
                            name="last_name"
                            onChange={handleChange}
                        />
                        <TextField required
                            label="שם משתמש"
                            name="username"
                            onChange={handleChange}
                            placeholder={defaultUsername}
                            onFocus={() => setCustomUsername(true)}
                            onBlur={() => {
                                if (!values.username || values.username === defaultUsername) {
                                    setCustomUsername(false);
                                }
                            }}
                            value={
                                customUsername ?
                                    values.username
                                    :
                                    values.username || defaultUsername
                            }
                        />
                        <TextField required type="email"
                            label="דואר אלקטרוני"
                            name="email"
                            onChange={handleChange}
                        />
                        <TextField required type="password"
                            label="סיסמה"
                            name="password"
                            onChange={handleChange}
                        />
                    </Stack>
                    <Button type="submit">שמירה</Button>
                </Box>
                <Backdrop open={waitingMode}>
                    <CircularProgress />
                </Backdrop>
            </Dialog>
        </>
    );
}