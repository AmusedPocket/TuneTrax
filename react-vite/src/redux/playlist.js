import { normalizeObj } from './helpers';


// Action types
const POST_LIKE = 'playlist/POST_LIKE'
const PUT_PLAYLIST = 'playlist/PUT_PLAYLIST';
const DELETE_LIKE = 'playlist/DELETE_LIKE';
const DELETE_PLAYLIST = 'playlist/DELETE_PLAYLIST';


// Action creator
export const postPlaylist = (like) => ({
     type: POST_LIKE,
     payload: like
})

export const putPlaylist = (playlist) => ({
     type: PUT_PLAYLIST,
     payload: playlist
})


// Thunk Post
export const ThunkPostLike = (playlistId) => async(dispatch) => {
     const res = await fetch (`/api/playlists/${playlistId}/like`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
     })

     if (res.ok){
          const { like } = await res.json()
          dispatch(postPlaylist(like))
          return like;
     } else {
          const data = await res.json();
          if(data.errors){
               return data
          }
     }
}


// Thunk Put
export const ThunkPutPlaylist = (updateplaylist, playlistId) => async (dispatch) => {
     const { title, playlistPic } = updateplaylist;

     const res = await fetch(`/api/playlists/${playlistId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
               title,
               playlistPic
          }),
     });

     if(res.ok){
          const newPlaylist = await res.json();
          dispatch(putPlaylist(newPlaylist));
          return newPlaylist;
     } else {
          const data = await res.json();
          if (data.errors){
               return data;
          }
     }
}


// Reducer
const initialState = {};

const playlistReducer = (state = initialState, action) => {
     switch (action.type) {
       case POST_LIKE:
         return {
           ...state,
           [action.payload.id]: action.payload
         };
       case PUT_PLAYLIST:
          return {

          }
       default:
         return state;
     }
   };


export default playlistReducer
