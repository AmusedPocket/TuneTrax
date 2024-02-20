import {normalizeObj} from "./helpers"
const GET_ALBUM= 'album/GET_ALBUM'

export const getAlbums = (albums) => {
    return {
        type: GET_ALBUM,
        albums
    }
}

export const thunkGetAlbum = (albumId) => async (dispatch)=> {
 const res = await fetch(`/api/albums/${albumId}`)
 if (res.ok){
    const album = await res.json()
    dispatch(getAlbums(album))
 } else {
    const data = await res.json()
    if(data.errors){
        return data;
    }
 }
}

const initialState = {}

const albumReducer = (state = initialState, action)=> {
    let newState;
    switch (action.type){
        case GET_ALBUM:
            newState = { ...state}
            newState.albums = normalizeObj(action.albums)
            return newState

        default:
            return state;
    }
}
 
export default albumReducer
