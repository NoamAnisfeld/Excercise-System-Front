import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setUsername } from '../global-state/userdata';

export default function NavBar() {

  const navigate = useNavigate();
  const username = useAppSelector(({ userdata }) => userdata.username);
  const dispatch = useAppDispatch();

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {username || "ברוכים הבאים"}
          </Typography>
          {username ?
            <Button
              color="inherit"

              onClick={() => {
                dispatch(setUsername(null))
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