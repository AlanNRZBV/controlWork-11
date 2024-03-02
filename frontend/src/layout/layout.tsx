import { Outlet } from 'react-router-dom';
import Navigation from '../components/UI/Navigation/Navigation.tsx';
import { Box } from '@mui/material';
import SideBar from '../features/SideBar/SideBar.tsx';

const Layout = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Box
          display="grid"
          gridTemplateRows="1fr"
          gridTemplateColumns="auto 1fr"
          gap="200px"
          sx={{ gridTemplateAreas: `'sidebar body'` }}
        >
          <SideBar />
          <Outlet />
        </Box>
      </main>
    </>
  );
};

export default Layout;
