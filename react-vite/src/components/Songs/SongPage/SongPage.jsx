import { useParams } from "react-router-dom";
import { thunkGetSong } from "../../../redux/song";
import { thunkAddUser } from "../../../redux/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SongPlayer from "../../Navigation/SongPlayer/SongPlayer";
import {  useSongContext } from "../../../context/SongPlayerContext";


const SongPage = () => {
    const { songId } = useParams()
    const dispatch = useDispatch()
    const { songs, setSongs } = useSongContext()

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

    

    function PlaySong(){
        if(songs[0]?.song_link !== song.song_link){
            setSongs([{
                songLink : song.song_link,
                songPic : song.song_pic,
                songName : song.song_name,
                userId : song.user_id,
                songId : song.id
            }, ...songs])
        }
    }



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
