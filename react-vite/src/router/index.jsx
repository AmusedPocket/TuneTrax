import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AlbumPage from '../components/AlbumPage';
import Layout from './Layout';
import UpdateAlbum from '../components/UpdateAlbum';
import AllSongs from '../components/Songs/AllSongs/allsongs';
import SongPage from '../components/Songs/SongPage/SongPage';
import PlaylistPage from '../components/PlaylistPage';
import UpdatePlaylist from '../components/UpdatePlaylist';
import HomePage from '../components/HomePage/HomePage';
import Upload from '../components/Upload';
import UpdateSong from '../components/UpdateSong';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />
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
        path: "albums/:albumId/edit",
        element: <UpdateAlbum />,
      },
      {
        path: "playlists/:playlistId",
        element: <PlaylistPage />,
      },
      {
        path: "playlists/:playlistId/edit",
        element: <UpdatePlaylist />,
      },
      {
        path: "songs",
        element: <AllSongs />
      },
      {
        path: "songs/:songId",
        element: <SongPage />
      },
      {
        path: "songs/:songId/edit",
        element: <UpdateSong />
      },
      {
        path: "upload",
        element: <Upload />
      }
    ],
  },
]);