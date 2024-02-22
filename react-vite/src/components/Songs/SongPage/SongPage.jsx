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
    
    const userId = song.songs.comments

    console.log("user id is", userId)
  
    const displayComments = songComments.map((comment) => {
        return <h1 key={comment.id}>{comment.user_id} {comment.comment} {comment.song_time} {comment.created_at} </h1>
    })
    

    return (
        <>  
            <SongPlayer />          
            {song.songs.title}
            {/* {song.songs.user.username} */}
            {song.songs.created_at}
            <p>#{song.songs.genre}</p>
            <p>{displayComments}</p>
        
        
        </>
    )
}

export default SongPage;