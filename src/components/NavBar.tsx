import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

interface NavBarProps {
    username?: string,
    onLogout?: () => void,
}

const toolbarStyles = {
    height: "3em",
    '@media all': {
        p: 1,
    },
    '> *': {
        flexBasis: {
            xs: "50%",
            md: "33%",
        },
        overflow: "hidden",
    },
    'img': {
        height: "60%",
    },
}

export default function NavBar({
    username = '',
    onLogout = () => { },
}: NavBarProps) {

    return (
        <Box>
            <AppBar color="secondary">
                <Toolbar sx={toolbarStyles}>
                    <UserBar username={username} onLogout={onLogout} />
                    <AppHeader />
                    <AppLogo />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

function AppHeader() {
    return <Typography
        variant="h1"
        component={Link}
        to="/"
        reloadDocument
        className="unstyledLink"

        lineHeight={1}
        fontSize={{
            xs: "5vw",
            md: "h3.fontSize",
        }}
        textAlign={{
            xs: "end",
            md: "center",
        }}
    >
        מערכת תרגילים
    </Typography>
}

function UserBar({
    username = '',
    onLogout = () => { },
}: NavBarProps) {

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuButtonRef = useRef<HTMLButtonElement>(null);

    return <Box
        display="flex"
        alignItems="center">
        {username ?
            <>
                <IconButton
                    ref={userMenuButtonRef}
                    onClick={() => setIsUserMenuOpen(s => !s)}
                    sx={{
                        p: 0,
                        "&&": {
                            outline: "none"
                        },
                    }}
                >
                    <Avatar />
                    <Menu
                        open={isUserMenuOpen}
                        anchorEl={userMenuButtonRef.current}
                    >
                        <MenuItem onClick={onLogout}>
                            יציאה
                        </MenuItem>
                    </Menu>
                </IconButton>

                <Typography
                    variant="h6"
                    component="span"
                    p={1}
                    lineHeight={1}
                    fontSize={{
                        xs: "5vw",
                        md: "h4.fontSize"
                    }}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                >
                    {username}
                </Typography>
            </>
            : <Avatar />}
    </Box>
}

function AppLogo() {
    return <Box
        height="100%"
        display={{
            xs: "none",
            md: "flex",
        }}
        alignItems="center"
        justifyContent="end"
    >
        <img src="/MeGo_logo.png" />
    </Box>
}