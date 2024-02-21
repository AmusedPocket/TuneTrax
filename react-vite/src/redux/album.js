import { createSelector } from "reselect";
import { normalizeObj } from "./helpers";

const GET_ALBUM= 'album/GET_ALBUM';
const GET_ALBUMS= 'album/GET_ALBUMS';
const ADD_ALBUM= 'album/ADD_ALBUM';

// Custom Selectors
export const selectSingleAlbum = (id) => createSelector(
    state => state.albums,
    albums => albums[id]
)

// Action Creators
export const getAlbum = (album) => ({
    type: GET_ALBUM,
    payload: album
})

export const getAlbums = (album) => ({
    type: GET_ALBUMS,
    payload: album
})

export const addAlbum = (album) => ({
    type: ADD_ALBUM,
    payload: album
})

// Thunks
export const thunkGetAlbum = (albumId) => async (dispatch)=> {
    const res = await fetch(`/api/albums/${albumId}`);

    if (res.ok) {
        const { album } = await res.json();
        dispatch(getAlbum(album));
        return album;
    }
    const data = await res.json();
    if(data.errors) return data;
}

export const thunkGetAlbums = () => async (dispatch)=> {
    const res = await fetch(`/api/albums/`);

    if (res.ok) {
        const { album } = await res.json();
        dispatch(getAlbums(album));
        return album;
    }
    const data = await res.json();
    if(data.errors) return data;
}

export const thunkAddAlbum = (album) => async (dispatch)=> {
    const res = await fetch("/api/albums/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album)
    });

    if (res.ok) {
        const { album } = await res.json();
        dispatch(addAlbum(album));
        return album;
    }
    const data = await res.json();
    if(data.errors) return data;
}

// Reducer
const initialState = {  }
const albumReducer = (state = initialState, action)=> {
    let newState;
    switch (action.type){
        case GET_ALBUM:
            newState = {...state};
            newState[action.payload.id] = action.payload
            return newState;
        case GET_ALBUMS:
            newState = {...normalizeObj(action.payload)};
            return newState;
        case ADD_ALBUM:
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState;
        default:
            return state;
    }
}
 
export default albumReducer;