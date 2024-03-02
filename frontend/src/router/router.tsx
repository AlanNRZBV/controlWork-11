import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout.tsx';
import NotFound from '../components/UI/NotFound/NotFound.tsx';
import Login from '../features/Users/Login.tsx';
import Register from '../features/Users/Register.tsx';
import Listings from '../features/Listings/Listings.tsx';
import ListingExtended from '../features/Listings/components/ListingExtended.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/*',
        element: <NotFound />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/',
        element: <Listings />,
      },
      {
        path: '/listing/:id',
        element: <ListingExtended />,
      },
    ],
  },
]);
