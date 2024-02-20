import { createSelector } from "reselect";
import { normalizeObj } from "./helpers";

const GET_ALBUM= 'album/GET_ALBUM';

export const selectSingleAlbum = (id) => createSelector(
    state => state.albums,
    albums => albums[id]
)

export const getAlbums = (albums) => {
    return {
        type: GET_ALBUM,
        payload: albums
    }
}

export const thunkGetAlbum = (albumId) => async (dispatch)=> {
    const res = await fetch(`/api/albums/${albumId}`);

    if (res.ok) {
        const { album } = await res.json();
        console.log(album)
        dispatch(getAlbums(album));
        return album;
    }
    const data = await res.json();
    if(data.errors) return data;
}

const initialState = {  }

const albumReducer = (state = initialState, action)=> {
    let newState;
    switch (action.type){
        case GET_ALBUM:
            newState = {...state};
            newState[action.payload.id] = action.payload
            return newState;
        default:
            return state;
    }
}
 
export default albumReducer;