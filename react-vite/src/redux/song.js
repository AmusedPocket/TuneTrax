import { normalizeObj } from "./helpers";

const GET_SONG = 'songs/GET_SONG';
const GET_SONGS = 'songs/GET_SONGS'


const getSong = (song) => ({
    type: GET_SONG,
    payload: song
})

const getSongs = (songs) => ({
    type: GET_SONGS,
    payload: songs
})



export const thunkGetSong = (songId) => async (dispatch) => {
    const response = await fetch(`/api/songs/${songId}`);

    if (response.ok) {
        const song = await response.body();
        dispatch(getSong(song));
        return song;
    }
    const data = await response.body();
    if (data.errors) return data;
}

export const thunkGetSongs = () => async (dispatch) => {
    const response = await fetch('/api/songs')
    if (response.ok){
        const songs = await response.json();
        dispatch(getSongs(songs))
        return songs;
    } else {
        return response;
    }
}

const initialState = { songs: {} }

const songReducer = (state=initialState, action) => {
    let newState = {...state}
    switch(action.type) {
        case GET_SONG:
            newState = {...state};
            newState.users = normalizeObj(action.payload);
            return newState;
        case GET_SONGS:
            newState = {...state}
            newState.allSongs = action.songs
            return newState;
        default:
            return state;
    }
}

export default songReducer;
