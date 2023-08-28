import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'

export default function NavBar({
    username = '',
    onLogout = () => {},
}: {
    username?: string,
    onLogout?: () => void,
}) {

    return (
        <Box>
            <AppBar>
                <Toolbar sx={{
                    '&&': {
                        px: 0,
                    },
                    '&& > *': {
                        flexBasis: 80,
                    }
                }}>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={{ alignItems: "start" }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" textAlign="center" sx={{ flexGrow: 1 }}>
                        {username || "ברוכים הבאים"}
                    </Typography>
                    {username ?
                        <Button
                            color="inherit"

                            onClick={onLogout}
                        >
                            יציאה
                        </Button>
                        : <IconButton
                            size="large"
                            color="inherit"
                            sx={{ alignItems: "end" }}
                        >
                            <PersonIcon />
                        </IconButton>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}