import { createSelector } from "reselect";
import { normalizeObj } from "./helpers";
import { thunkGetSongs } from "./song";



// Action types
const GET_PLAYLIST= 'album/GET_PLAYLIST';
const GET_PLAYLISTS= 'album/GET_PLAYLISTS';
const ADD_PLAYLIST= 'album/ADD_PLAYLIST';
const DELETE_PLAYLIST= 'album/DELETE_PLAYLIST';
const ADD_LIKE = 'playlist/ADD_LIKE';
const DELETE_LIKE = 'playlist/DELETE_LIKE'

// Custom Selectors
export const selectSinglePlaylist = (id) => createSelector(
     state => state.playlists,
     playlists => playlists[id]
)
 
// Action creator
export const getPlaylist = (playlist) => ({
     type: GET_PLAYLIST,
     payload: playlist
})

export const getPlaylists = (playlist) => ({
     type: GET_PLAYLISTS,
     payload: playlist
})

export const addPlaylist = (playlist) => ({
     type: ADD_PLAYLIST,
     payload: playlist
})

export const deletePlaylist = (playlistId) => ({
     type: DELETE_PLAYLIST,
     payload: playlistId
})

export const addLike = (playlistId, current_user, playlist) => ({
     type: ADD_LIKE,
     payload: {playlistId, current_user, playlist}
})

export const deleteLike = (playlistId, current_user) => ({
     type: DELETE_LIKE,
     payload: {playlistId, current_user}
})


// Thunks
export const thunkGetPlaylist = (playlistId) => async (dispatch)=> {
     if (!playlistId) return; 
     const res = await fetch(`/api/playlists/${playlistId}/`);

     if (res.ok) {
          const { playlist } = await res.json();
          dispatch(getPlaylist(playlist));
          return playlist;
     }
     const data = await res.json();
     if(data.errors) return data;
}

export const thunkGetPlaylists = () => async (dispatch)=> {
     const res = await fetch(`/api/playlists/`);

     if (res.ok) {
          const { playlist } = await res.json();
          dispatch(getPlaylists(playlist));
          return playlist;
     }
     const data = await res.json();
     if(data.errors) return data;
}

export const thunkAddPlaylist = (playlist) => async (dispatch)=> {
     const res = await fetch("/api/playlists/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(playlist)
     });

     if (res.ok) {
          const { playlist } = await res.json();
          dispatch(addPlaylist(playlist));
          return playlist;
     }
     const data = await res.json();
     if(data.errors) return data;
}

export const thunkUpdatePlaylist = (playlist) => async (dispatch)=> {
     const res = await fetch(`/api/playlists/${playlist.id}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(playlist)
     });

     if (res.ok) {
          const { playlist } = await res.json();
          dispatch(addPlaylist(playlist));
          return playlist;
     }
     const data = await res.json();
     if(data.errors) return data;
}

export const thunkDeletePlaylist = (playlistId) => async (dispatch)=> {
     const res = await fetch(`/api/playlists/${playlistId}/`, {
          method: "DELETE"
     });

     if (res.ok) {
          const { playlist } = await res.json();
          dispatch(deletePlaylist(playlistId));
          dispatch(thunkGetSongs());
          return playlist;
     }
     const data = await res.json();
     if(data.errors) return data;
}

export const thunkAddLike = (playlistId, current_user) => async(dispatch) => {
     const response = await fetch (`/api/playlists/${playlistId}/like/`, {
          method: 'POST'
     })

     const playlist = await response.json()
     if(playlist.message === "added like"){
          dispatch(addLike(playlistId, current_user, playlist))
          return 1
     } else if (playlist.message === "deleted like"){
          dispatch(deleteLike(playlistId, current_user))
          return -1
     }
     return 0    
}

// Reducer
const initialState = {};
const playlistReducer = (state = initialState, action) => {
     let newState;
     switch (action.type){
          case GET_PLAYLIST:
               newState = {...state};
               newState[action.payload.id] = action.payload
               return newState;
          case GET_PLAYLISTS:
               newState = {...normalizeObj(action.payload)};
               return newState;
          case ADD_PLAYLIST:
               newState = {...state}
               newState[action.payload.id] = action.payload
               return newState;
          case DELETE_PLAYLIST:
               newState = {...state};
               delete newState[action.payload];
               return newState;
          case ADD_LIKE:
               newState = {...state}
               newState[action.payload.id] = action.payload
               return newState;
          default:
               return state;
     }
   };


export default playlistReducer
