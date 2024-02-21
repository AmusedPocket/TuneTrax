import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AlbumPage from '../components/AlbumPage';
import Layout from './Layout';
import CreateSet from '../components/CreateSet';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "albums/:albumId",
        element: <AlbumPage />,
      },
      {
        path: "albums/new",
        element: <CreateSet />,
      },
    ],
  },
]);