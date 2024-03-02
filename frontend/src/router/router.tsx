import {createBrowserRouter} from 'react-router-dom';
import Layout from '../layout/layout.tsx';
import NotFound from '../components/UI/NotFound/NotFound.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [

      {
        path: '/*',
        element: <NotFound />,
      },
    ],
  },
]);
