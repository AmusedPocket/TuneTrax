import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import CreateSong from "../Songs/CreateSong";
import { thunkGetSong } from "../../redux/song";

function UpdateSong() {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const song = useSelector(state => state.songs.songs[songId]);

    useEffect(() => {
        dispatch(thunkGetSong(songId));
    }, [dispatch, songId])
    
    if (!song) return <></>;

    console.log(song)
    song.image = song.song_pic;

    return (
        <>
            <CreateSong editedSong={song} songId={songId}/>
        </>    
    );
}

export default UpdateSong;