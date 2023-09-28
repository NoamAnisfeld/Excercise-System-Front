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
import { InvalidCredentialsError } from '../requests/auth'

export default function Login() {

    const [inputUserEmail, setInputUserEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const login = useLogin();
 
    function handleInputUserEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputUserEmail(event.target.value);
        setErrorMessage('');
    }

    function handleInputPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputPassword(event.target.value);
        setErrorMessage('');
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (inputUserEmail && inputPassword) {
            try {
                await login({
                    email: inputUserEmail,
                    password: inputPassword,
                });
            } catch (error) {
                if (error instanceof InvalidCredentialsError) {
                    setErrorMessage('פרטי ההתחברות אינם תואמים')
                } else {
                    setErrorMessage(
                        'אירעה שגיאה בעת ניסיון ההתחברות. בידקו את החיבור לאינטרנט או נסו שוב מאוחר יותר.'
                    );
                }
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
                        id="user-email"
                        label="כתובת אימייל"
                        name="user-email"
                        autoFocus={Boolean(!inputUserEmail || inputPassword)}

                        value={inputUserEmail}
                        onChange={handleInputUserEmailChange}
                    />

                    <TextField
                        type="password"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="סיסמה"
                        name="password"

                        value={inputPassword}
                        onChange={handleInputPasswordChange}
                    />

                    <Button
                        type="submit"
                        disabled={!inputUserEmail || !inputPassword}
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