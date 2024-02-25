import { normalizeObj } from "./helpers";
import {createSelector} from "reselect"

const GET_SONG = 'songs/GET_SONG';
const GET_SONGS = 'songs/GET_SONGS';
const POST_SONG = 'songs/POST_SONG';
const EDIT_SONG = 'songs/EDIT_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';
const POST_COMMENT = 'songs/POST_COMMENT';
const DELETE_COMMENT = 'songs/DELETE_COMMENT';
const EDIT_COMMENT = 'songs/EDIT_COMMENT';
const ADD_LIKE = 'songs/ADD_LIKE';
const POST_ALBUM_SONG = 'songs/POST_ALBUM_SONG';
const CLEAR_ALBUM_SONGS = 'songs/CLEAR_ALBUM_SONGS';


const getSong = (song) => ({
    type: GET_SONG,
    payload: song
})

const getSongs = (songs) => ({
    type: GET_SONGS,
    payload: songs
})

const postSong = (song) => ({
    type: POST_SONG,
    payload: song
})

const editSong = (song) => ({
    type: EDIT_SONG,
    payload: song
})

const deleteSong = (songId) => ({
    type: DELETE_SONG,
    payload: { songId, commentId }
})

const postComment = (comment) => ({
    type: POST_COMMENT,
    payload: comment
})

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    payload: commentId
})

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    payload: comment
})

const addLike = () => ({
    type: ADD_LIKE
})

const postAlbumSongs = (song) => ({
    type: POST_ALBUM_SONG,
    payload: song
})

const clearAlbumSongs = () => ({
    type: CLEAR_ALBUM_SONGS
})

// Thunks
export const thunkGetSong = (songId) => async (dispatch) => {
    const response = await fetch(`/api/songs/${songId}/`);

    if (response.ok) {
        const song = await response.json();
        dispatch(getSong(song));
        return song;
    }
    const data = await response.json();
    if (data.errors) return data;
}

export const thunkGetSongs = () => async (dispatch) => {
    const response = await fetch('/api/songs/')
    if (response.ok){
        const songs = await response.json();
        dispatch(getSongs(songs))
        return songs;
    }

    const data = await response.json()
    if(data.errors) return data;

}

export const thunkPostSong = (song) => async (dispatch) => {
    const data = new FormData();
    for (let key of Object.keys(song))
        data.append(key, song[key]);
    console.log(data.song)
    const response = await fetch('/api/songs/',{
        method: 'POST',
        body: data
    })
    if (response.ok){
        const new_song = await response.json()
        dispatch(postSong(new_song))
        return new_song;
    } else {
        const data = await response.json();
        if(data.errors){
            return data
        }
    }
}

export const thunkEditSong = (song, songId) => async (dispatch) => {
    const response = await fetch(`/api/songs/${songId}/`, {
        method: 'PUT',
        body: JSON.stringify(song)
    })
    if (response.ok){
        const edit_song = await response.json()
        dispatch(editSong(edit_song))
        return edit_song;
    } else {
        const data = await response.json();
        if(data.errors){
            return data
        }
    }
}

export const thunkDeleteSong = (songId) => async (dispatch) => {
    const response = await fetch(`/api/songs/${songId}/`, {
        method: 'DELETE',
    })
    if (response.ok){
        const delete_song = await response.json()
        dispatch(deleteSong(delete_song))
        return delete_song;
    } else {
        const data = await response.json();
        if(data.errors){
            return data
        }
    }
}

export const thunkPostComment = (songId, comment) => async (dispatch) => {
    const response = await fetch(`/api/songs/${songId}/comments`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const post_comment = await response.json()
        console.log("post comment is ", post_comment)
        dispatch(postComment(post_comment))
        return post_comment
    } else {
        const data = await response.json();
        if(data.errors){
            return data
        }
    }
}

export const thunkDeleteComment = (songId, commentId) => async(dispatch) => {
    const response = await fetch(`/api/songs/${songId}/comments/${commentId}`, {
        method: "DELETE"
    })

    if(response.ok){
        const delete_comment = await response.json()
        dispatch(deleteComment(commentId))
        return delete_comment
    } else {
        const data = await response.json();
        if(data.errors){
            return data
        }
    }
}

export const thunkEditComment = (songId, comment) => async (dispatch) => {
    const response = await fetch(`/api/songs/${songId}/comments/${comment.id}`, {
        method: "POST",
        body: JSON.stringify(comment)
    })
    if(response.ok){
        const edit_comment = await response.json()
        dispatch(editComment(edit_comment))
        return edit_comment
    } else {
        const data = await response.json();
        if(data.errors){
            return data
        }
    }
}

export const thunkAddLike = (songId) => async(dispatch) => {
    const response = await fetch(`/api/songs/${songId}/like`, {
        method: "POST",

    })
}

export const thunkPostAlbumSong = (song) => async(dispatch) => {
    song = await dispatch(thunkPostSong(song));

    dispatch(postAlbumSongs(song));
    return song;
}

export const thunkClearAlbumSongs = () => async(dispatch) => {
    dispatch(clearAlbumSongs());
}


const initialState = { songs: {}, postedAlbumSongs: {} }

const songReducer = (state=initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_SONG:
            newState = {...state};
            newState.songs[action.payload.id] = action.payload;
            return newState;
        case GET_SONGS:
            newState = {...state};
            newState.songs = action.payload;
            return newState;
        case POST_SONG:
            newState = {...state}
            newState.songs = { ...state.songs, [action.payload.id]: action.payload };
            return newState;
        case EDIT_SONG:
            return {
                ...state,
                song: action.payload
            };
        case DELETE_SONG:
            newState.songs = { ...state.songs };
            delete newState.songs[action.songId];
            return newState;
        case POST_COMMENT:
            newState = { ...state }
            newState.songs = { ...state.songs, [action.payload.id]: action.payload}
            return newState;
        case DELETE_COMMENT:
            newState = { ...state }
            newState.songs = { ...state.songs }
            delete newState.songs[action.songId.commentId];
            return newState;
        case EDIT_COMMENT:
            newState = { ...state, comment: action.comment };
            return newState;
        case POST_ALBUM_SONG:
            newState = { ...state };
            newState.postedAlbumSongs[action.payload.id] = action.payload;
            return newState;
        case CLEAR_ALBUM_SONGS:
            newState = { ...state };
            newState.postedAlbumSongs = {};
            return newState;
        default:
            return state;
    }
}

export default songReducer;
