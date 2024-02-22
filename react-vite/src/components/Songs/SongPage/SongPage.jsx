import { useParams } from "react-router-dom";
import { thunkGetSong } from "../../../redux/song";
import { thunkAddUser } from "../../../redux/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SongPlayer from "../../Navigation/SongPlayer/SongPlayer";


const SongPage = () => {
    const { songId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetSong(songId))
    }, [dispatch, songId])

    const song = useSelector((state)=>state.songs)

    const songComments = song.songs.comments
    if(!songComments){
        return null;
    }
    // console.log("songComments", songComments)

    const userId = song.songs.comments

    // console.log("user id is", userId)

    const displayComments = songComments.map((comment) => {
        return <h2 key={comment.id}>{comment.user_id} {comment.comment} {comment.song_time} {comment.created_at} </h2>
    })


    return (
        <h1>
            {song.songs.title}
            {/* {song.songs.user.username} */}
            {song.songs.created_at}
            <span>#{song.songs.genre}</span>
            <span>{displayComments}</span>
        </h1>
    )
}

export default SongPage;
