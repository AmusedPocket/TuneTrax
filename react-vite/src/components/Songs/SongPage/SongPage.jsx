import { useParams } from "react-router-dom";
import { thunkGetSong } from "../../../redux/song";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSongContext } from "../../../context/SongPlayerContext";
import CreateComment from "../../Comments/CreateComment/CreateComment";
// import { selectComments } from "../../../redux/song";
import { thunkPostComment } from "../../../redux/song";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import EditComment from "../../Comments/EditComment/EditComment";

const SongPage = () => {
    const { songId } = useParams()
    const dispatch = useDispatch()
    const { songs, setSongs } = useSongContext()
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])
    const {songTime} = useSongContext()
    const [enabaleManage, setEnableManage] = useState(false)
    
    const user = useSelector(state => state.session.user)

    console.log("user is:", user.id)
    
    
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const errors = []
        if (comment.length > 255) errors.push("Comment needs to be less than 255 characters.")

        if (errors.length > 0){
            setErrors(errors);
            return;
        }

        const newComment = {comment, song_time: songTime}

        const updatingComments = await dispatch(thunkPostComment(songId, newComment))
        setComment("")
        songComments.push(updatingComments)
    }

    return (

        <h1>
            <button onClick={PlaySong}>Play Song</button>
            {song.title}
            {/* {song.user.username} */}
            {song.created_at}
            <span>#{song.genre}</span>
            <span> {songComments?.map((comment) => {
                return <>
                    <span key={comment.id}>
                        <p><h2><img src={comment.user.profile_pic} /> {comment.user.username} </h2>at {comment.song_time} {comment.created_at}</p>
                        <p>{comment.comment} </p>
                        {(comment.user.id === user.id) &&
                        <OpenModalButton
                        buttonText="Manage Comment"
                        modalComponent={<EditComment comment={comment}/>}
                        />
                        }
                    </span>
                </>
            })}</span>
            <form onSubmit={handleSubmit} type='submit'>
                <input
                 placeholder="Write a comment for the song"
                 type="text"
                 maxLength="255"
                 value={comment}
                 onChange={(e)=>setComment(e.target.value)}
                />
                <input type="submit"/>
            </form>
        </h1>
 

    )
}

export default SongPage;
