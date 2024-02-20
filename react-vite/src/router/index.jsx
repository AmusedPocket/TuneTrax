import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AllSongs from '../components/Songs/AllSongs/allsongs';
import SongPage from '../components/Songs/SongPage/SongPage';

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
        path: "songs",
        element: <AllSongs />
      },
      {
        path: "songs/:songId",
        element: <SongPage />
      }
    ],
  },
]);