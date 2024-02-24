import { useParams } from "react-router-dom";
import { thunkGetSong } from "../../../redux/song";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSongContext } from "../../../context/SongPlayerContext";
import CreateComment from "../../Comments/CreateComment/CreateComment";
import WaveSurfer from 'wavesurfer.js'
import Waveform from "../../Waveform";
// import { selectComments } from "../../../redux/song";


const SongPage = () => {
    const { songId } = useParams()
    const dispatch = useDispatch()
    const { songs, setSongs, songTime } = useSongContext()

    useEffect(() => {
        dispatch(thunkGetSong(songId))
    }, [dispatch, songId])

    const song = useSelector((state) => state.songs.songs[songId])
    // console.log("song commentssssssssssssssssssss =====>>>>", songComments)

    if (!song) return;

    // console.log("user id is", userId)
    const songComments = song.comments

    function PlaySong() {
        console.log("song is:", song)
        if (songs[0]?.songLink !== song.song_link) {
            console.log("inside if statement")
            setSongs([{
                songLink: song.song_link,
                songPic: song.song_pic,
                songName: song.song_name,
                userId: song.user_id,
                songId: song.id
            }, ...songs])
        }
        const element = document.querySelector("audio")
        if (element) {
            element.currentTime = 0
            element.play()
        }
    }


    console.log(song);
    return (

        <>
            <button onClick={PlaySong}>Play Song</button>
            {song.title}
            {/* {song.user.username} */}
            {song.created_at}
            <span>#{song.genre}</span>
            <Waveform audio={song} />
            <span> 
                {songComments?.map((comment) => 
                    <span key={comment.id}>
                        <p><h2><img src={comment.user.profile_pic} /> {comment.user.username} </h2>at {comment.song_time} {comment.created_at}</p>
                        <p>{comment.comment} </p>
                    </span>)
                }
            </span>
            <CreateComment song={song} />
        </>
 

    )
}

export default SongPage;
