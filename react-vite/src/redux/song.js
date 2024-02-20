import normalizeObj from "./helpers";

const GET_SONG = 'songs/addSong';

const getSong = (song) => ({
    type: ADD_SONG,
    payload: song
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

const initialState = { songs: {} }

const songReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_SONG:
            newState = {...state};
            newState.users = normalizeObj(action.payload);
            return newState;
        default:
            return state;
    }
}

export default songReducer;