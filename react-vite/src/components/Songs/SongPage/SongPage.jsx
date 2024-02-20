import { useParams } from "react-router-dom";
import { thunkGetSong } from "../../../redux/song";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const SongPage = () => {
    const { songId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetSong(songId))
    }, [dispatch, songId])
    
    const song = useSelector((state)=>state.songs)

    
    return (
        <>
        {song.songs.title}
        {song.songs.user.username}
        {song.songs.created_at}
        <p>#{song.songs.genre}</p>
        </>
    )
}

export default SongPage;