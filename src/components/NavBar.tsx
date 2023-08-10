import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

import { useNavigate } from 'react-router-dom';

export default function NavBar({
  username,
  setUsername,
}: {
  username: string | null,
  setUsername: (newUsername: string | null) => void
}) {

  const navigate = useNavigate();

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

              onClick={() => {
                setUsername(null)
                navigate("/login")
              }}
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