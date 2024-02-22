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

    const song = useSelector((state)=>state.songs.songs[songId])
    

    if(!song) return;

    // console.log("user id is", userId)
    const songComments = song.comments
    const displayComments = songComments?.map((comment) => {
        return <h2 key={comment.id}>{comment.user_id} {comment.comment} {comment.song_time} {comment.created_at} </h2>
    })

    

    function PlaySong(){
        console.log("song is:", song)
        if(songs[0]?.songLink !== song.song_link){
            console.log("inside if statement")
            setSongs([{
                songLink : song.song_link,
                songPic : song.song_pic,
                songName : song.song_name,
                userId : song.user_id,
                songId : song.id
            }, ...songs])
        } 
        const element = document.querySelector("audio")
        if(element){
            element.currentTime = 0
            element.play()
            }
    }
    


    
    return (
        <h1>
            <button onClick={PlaySong}>Play Song</button>
            {song.title}
            {/* {song.user.username} */}
            {song.created_at}
            <span>#{song.genre}</span>
            <span>{displayComments}</span>
        </h1>
    )
}

export default SongPage;
