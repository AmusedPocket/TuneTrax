import normalizeObj from "./helpers"

const GET_SONG = 'songs/addSong'

const getSong = (song) => ({
    type: ADD_SONG,
    payload: song
})

export const thunkGetSong = (songId) => async (dispatch) => {
    const response = await fetch(`/api/song/${songId}`);
    if (response.ok) {
        const song = await response.body();
        dispatch(getSong(song))
        return song;
    }
    const data = await response.body();
    if (data.errors) return data;
}

const initialState = { songs: {} }

function songReducer(state=initialState, action) {
    switch(action.type) {
        case GET_SONG:
            return {...state, [action.payload.id]:action.payload};
        default:
            return state;
    }
}