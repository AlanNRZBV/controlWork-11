import { AppBar, Box, Button, Modal, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../../../features/Users/usersSlice.ts';
import { useAppSelector } from '../../../app/hooks.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';
import { useState } from 'react';
import AddListingForm from "../../../features/Listings/components/AddListingForm.tsx";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Navigation = () => {
  const user = useAppSelector(selectUser);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          to="/"
          component={NavLink}
          variant="h6"
          color="white"
          sx={{ mr: 'auto', textDecoration: 'none' }}
        >
          Market
        </Typography>
        <Box>
          {user ? (
            <Button
              onClick={handleOpen}
              color="warning"
              variant="contained"
              sx={{ mr: 2 }}
            >
              Add listing
            </Button>
          ) : (
            <></>
          )}
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Box>
      </Toolbar>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AddListingForm closeHandler={handleClose} />
        </Box>
      </Modal>
    </AppBar>
  );
};

export default Navigation;
