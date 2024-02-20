import { normalizeObj } from './helpers';


const POST_PLAYLIST = 'playlist/POST_PLAYLIST'


export const postPlaylist = (playlist) => ({
     type:POST_PLAYLIST,
     payload: playlist
})


export const ThunkAddPlaylist = (playlistId) => async(dispatch) => {
     const res = await fetch (`/api/${playlistId}/like`)

     if (res.ok){
          const { playlist } = await res.json()
          dispatch(postPlaylist(playlist))
          return playlist;
     } else {
          const data = await res.json();
          if(data.errors){
               return data
          }
     }
}


const initialState = {};

const playlistReducer = (state = initialState, action) => {
     let newState;
     switch (action.type) {
          case POST_PLAYLIST:
               newState = { ...state };
               newState.playlist[action.playlist.id] = action.playlist
          default:
               return state;
     }
}


export default playlistReducer
