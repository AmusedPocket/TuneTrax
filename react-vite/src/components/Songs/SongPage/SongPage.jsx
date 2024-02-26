import { useNavigate, useParams } from "react-router-dom";
import { thunkGetSong, thunkEditComment, thunkAddLike } from "../../../redux/song";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSongContext } from "../../../context/SongPlayerContext";
import CreateComment from "../../Comments/CreateComment/CreateComment";
// import WaveSurfer from 'wavesurfer.js'
import Waveform from "../../Waveform";
// import { selectComments } from "../../../redux/song";
import { thunkPostComment } from "../../../redux/song";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import { useModal } from "../../../context/Modal";
import { thunkDeleteComment } from "../../../redux/song";
import "./SongPage.css"
import DeleteSongModal from "../../DeleteSongModal";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";



const SongPage = () => {
    const { songId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { songs, setSongs } = useSongContext()
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])
    const { songTime } = useSongContext()
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user)
    const [commentText, setCommentText] = useState('')
    const [editingComment, setEditingComment] = useState(-1)
    const [canLike, setCanLike] = useState(false)


    useEffect(() => {
        dispatch(thunkGetSong(songId))
    }, [dispatch, songId])



    const song = useSelector((state) => state.songs.songs[songId])


    const [currentLikes, setCurrentLikes] = useState(0)

    useEffect(()=> {
        if(song) setCurrentLikes(song.likes)
        }, [song])


    const likeClick = () => {
        // const song_likes = song.likes;
        setCanLike(true)
        dispatch(thunkAddLike(song.id, user))
            .then(result =>{
                song.likes += result
                setCurrentLikes(song.likes)
                setCanLike(false)
            })
    }

    if (!song) return(
        <>
            <h1>This song doesn&apos;t exist...</h1>
            <h5>sad noot noot</h5>
        </>
    );

    // console.log("user id is", userId)
    const songComments = song.comments

    function PlaySong() {
        console.log("song is:", song)
        if (songs[0]?.songLink !== song.song_link) {
            setSongs([{
                songLink: song.song_link,
                songPic: song.song_pic,
                songName: song.title,
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

    // Delete comment handle
    const yesButtonClick = async (commentId) => {


        await dispatch(thunkDeleteComment(songId, commentId))
        const removeComment = songComments.indexOf(songComments.find((comment) => comment.id === commentId))
        songComments.splice(removeComment, 1)



        return closeModal();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const errors = []
        if (comment?.length > 255) errors.push("Comment needs to be less than 255 characters.")

        if (errors?.length > 0) {
            setErrors(errors);
            return;
        }

        const newComment = { comment, song_time: songTime }

        const updatingComments = await dispatch(thunkPostComment(songId, newComment))
        setComment("")
        songComments.push(updatingComments)
    }

    // Edit Comment functionality
    const submitEdit = async (e) => {
        e.preventDefault();
        const edits = {
            id: editingComment,
            comment: commentText
        }

        await dispatch(thunkEditComment(songId, edits))
        await dispatch(thunkGetSong(songId))
        setEditingComment(-1)
        closeModal()
    }

    const editComment = (comment) => {
        setEditingComment(comment.id)
        setCommentText(comment.comment)
    }

    const minuteSecond = (song_time) => {
        const totalSeconds = parseFloat(song_time);
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = Math.floor(totalSeconds % 60)
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        return formattedTime
    }

    const postedAtDate = (created_at) => {
        const date = new Date(created_at + " UTC")
        const now = new Date()

        const timeDiff = now - date -  date.getTimezoneOffset() * 60000
        const secondsDiff = Math.floor(timeDiff / 1000)
        const minutesDiff = Math.floor(secondsDiff / 60)
        const hoursDiff = Math.floor(minutesDiff / 60)
        const daysDiff = Math.floor(hoursDiff / 24)
        const monthsDiff = Math.floor(daysDiff / 30)
        const yearsDiff = Math.floor(monthsDiff / 12)

        if(yearsDiff >=1){
            return `${yearsDiff} year${yearsDiff !== 1 ? 's': ''} ago`
        } else if (monthsDiff >= 1){
            return `${monthsDiff} month${monthsDiff !== 1 ? 's': ''} ago`
        } else if (daysDiff >= 1){
            return `${daysDiff} day${daysDiff !== 1 ? 's' : ''} ago`
        } else {
            const happyTime = Math.max(0, hoursDiff)
            return `${happyTime} hour${happyTime !== 1 ? 's' : ''} ago`
        }
    }

    return (

        <>
            <div className="song-header">
                {/* head container */}

                <div className="song-header_data">
                    <div className="song-header_data-top">
                        <div id="song-header_data-top-left">
                            <div className="song-header_data-top-button">
                                <button onClick={PlaySong} className="play-button"><i className="fa-solid fa-play"></i></button>
                            </div>
                        <div>
                            <h3>{song.title}</h3>
                            {/* {song.user.username} */}
                            <h5>{song.created_at}</h5>
                        </div>
                            <span>#{song.genre}</span>
                        </div>
                    </div>
                    <div className="song-header-waveform">
                        <Waveform audio={song} />
                    </div>
                </div>
                    <div className="song-header_data-bottom">
                        <p><button onClick={()=>likeClick()} disabled={canLike} style={{cursor: "pointer"}}>
                            <div>
                                <i className="fa-solid fa-heart">{currentLikes}</i>
                            </div></button></p>
                        {song.user.id == user?.id && <button onClick={() => navigate(`/songs/${song.id}/edit`)}>Edit</button>}
                        {song.user.id == user?.id && 
                            <button>
                                <OpenModalMenuItem
                                    itemText="Delete"
                                    modalComponent={<DeleteSongModal songId={songId} navigate={navigate} />}
                                />
                            </button>
                        }
                    </div>
            </div>

            <div className="song-comment">
                {/* song body container */}
                <div className="song-body-text">
                    <h2 style={{color: "rgba(0, 4, 51)"}}>Song Body:</h2>
                    <h4 style={{color: "rgba(0, 4, 51)"}}>{song.body}</h4>
                </div>
                <div className="song-comment-input">
                        <form onSubmit={handleSubmit} type='submit'>
                            <input
                                placeholder="Write a comment for the song"
                                type="text"
                                maxLength="255"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <input type="submit"  style={{cursor: "pointer", marginLeft: "20px",  color: "#000433", border: "1.5px solid rgba(0, 4, 51, .3)"}}/>
                        </form>
                </div>

                <div className="song-comment-all">
                    <span>
                        {songComments
                            ?.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
                            .map((comment) => {
                            return <>
                                <span key={comment.id} className="song-comment-eachone">
                                    <p>
                                        <h2 style={{padding: "5px", color:"#FFFFAB", backgroundColor: "rgba(0, 4, 51)", marginTop: "20px", borderRadius: "10px", width:"150px"}}>
                                            <img src={comment.user.profile_pic} /> {comment.user.username}
                                        </h2>at {minuteSecond(comment.song_time)} · {postedAtDate(comment.created_at)}
                                    </p>
                                {comment.id === editingComment ? (<form onSubmit={submitEdit}>
                            <div style={{padding: "20px 0px"}}>
                                <textarea
                                    value={commentText}
                                    placeholder={comment.comment}
                                    onChange={(e) => setCommentText(e.target.value)}/>
                                <button onSubmit={submitEdit} type="submit" style={{color: "#000433", border: "1.5px solid rgba(0, 4, 51, .3)", borderRadius: "5px", padding: "1px 5px", margin: "10px"}}>Submit Edit</button>
                            </div>
                        </form>) : <p>{comment.comment} </p>}
                                {user && (comment.user.id === user.id) &&
                                    <button onClick={() => window.alert('Feature coming soon')}>Manage Comment</button>
                                }

                                {user && (comment.user.id === user.id) && <OpenModalButton
                                    buttonText="Delete Comment"
                                    modalComponent={
                                    <div style={{backgroundColor: "#FFFFAB", padding:"30px"}}>
                                        <h2>Confirm Delete</h2>

                                        <button onClick={() => window.alert('Feature coming soon')} style={{color: "#000433", border: "1.5px solid rgba(0, 4, 51, .3)", borderRadius: "5px", padding: "1px 15px", margin: "10px", backgroundColor: "#EF3E2B"}}>
                                            Yes
                                        </button>

                                        <button onClick={closeModal} style={{color: "#000433", border: "1.5px solid rgba(0, 4, 51, .3)", borderRadius: "5px", padding: "1px 15px", margin: "10px", backgroundColor: "rgba(0, 4, 51, .3)"}}>
                                            No
                                        </button>
                                        {/* DeleteComment comment={comment} songComments={songComments} */}
                                    </div>}
                                />}
                            </span>
                        </>
                    })}</span>
                </div>
            </div>

        </>


    )
}

export default SongPage;
