import Avatar from '@mui/material/Avatar'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import { useState } from 'react'
import { useLogin } from '../hooks'

export default function Login() {

    const [inputUsername, setInputUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const login = useLogin();
 
    function handleInputUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputUsername(event.target.value);
        setErrorMessage('');
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (inputUsername) {
            try {
                await login({ username: inputUsername });
            } catch (error) {
                setErrorMessage(error instanceof Error && error.message || 'שגיאה');
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ minHeight: '20em' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    כניסה
                </Typography>
                <Box component="form"
                    method="post"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="שם משתמש"
                        name="username"
                        autoFocus

                        value={inputUsername}
                        onChange={handleInputUsernameChange}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        כניסה
                    </Button>

                </Box>

                {errorMessage ?
                <Alert severity="error">
                    {errorMessage}
                </Alert>
                : undefined}
            </Box>
        </Container>
    );
}