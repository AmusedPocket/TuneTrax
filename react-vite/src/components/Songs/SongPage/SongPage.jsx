import { useParams } from "react-router-dom";
import { thunkGetSong, thunkEditComment } from "../../../redux/song";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSongContext } from "../../../context/SongPlayerContext";
import CreateComment from "../../Comments/CreateComment/CreateComment";
import WaveSurfer from 'wavesurfer.js'
import Waveform from "../../Waveform";
// import { selectComments } from "../../../redux/song";
import { thunkPostComment } from "../../../redux/song";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import { useModal } from "../../../context/Modal";
import { thunkDeleteComment } from "../../../redux/song";


const SongPage = () => {
    const { songId } = useParams()
    const dispatch = useDispatch()
    const { songs, setSongs } = useSongContext()
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])
    const { songTime } = useSongContext()
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user)
    const [commentText, setCommentText] = useState('')
    const [editingComment, setEditingComment] = useState(-1)


    useEffect(() => {
        dispatch(thunkGetSong(songId))
    }, [dispatch, songId])



    const song = useSelector((state) => state.songs.songs[songId])

    if (!song) return;

    // console.log("user id is", userId)
    const songComments = song.comments

    function PlaySong() {
        console.log("song is:", song)
        if (songs[0]?.songLink !== song.song_link) {
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
        if (comment.length > 255) errors.push("Comment needs to be less than 255 characters.")

        if (errors.length > 0) {
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
        console.log("I am the edits: ", edits)

        await dispatch(thunkEditComment(songId, edits))
        await dispatch(thunkGetSong(songId))
        setEditingComment(-1)
        closeModal()
    }

    const editComment = (comment) => {
        setEditingComment(comment.id)
        setCommentText(comment.comment)     
    }

    

    return (

        <>
            <button onClick={PlaySong}>Play Song</button>
            {song.title}
            {/* {song.user.username} */}
            {song.created_at}
            <span>#{song.genre}</span>
            <Waveform audio={song} />
            <span> 
                {songComments?.map((comment) => {
                    return <><span key={comment.id}>
                        <p><h2><img src={comment.user.profile_pic} /> {comment.user.username} </h2>at {comment.song_time} {comment.created_at}</p>
                        {comment.id === editingComment ? (<form onSubmit={submitEdit}>
                    <textarea
                        value={commentText}
                        placeholder={comment.comment}
                        onChange={(e) => setCommentText(e.target.value)} />
                    <button onSubmit={submitEdit} type="submit">Submit Edit</button>
                </form>) : <p>{comment.comment} </p>}
                        {(comment.user.id === user.id) &&
                            <button onClick={()=>editComment(comment)}>Manage Comment</button>
                        }

                        {(comment.user.id === user.id) && <OpenModalButton
                            buttonText="Delete Comment"
                            modalComponent={<>
                                <h2>Confirm Delete</h2>
                                <button onClick={() => yesButtonClick(comment.id)}>Yes</button>
                                <button onClick={closeModal}>No</button>
                                {/* DeleteComment comment={comment} songComments={songComments} */}
                            </>}
                        />}
                    </span>
                </>
            })}</span>
            <form onSubmit={handleSubmit} type='submit'>
                <input
                    placeholder="Write a comment for the song"
                    type="text"
                    maxLength="255"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <input type="submit" />
            </form>
        </>


    )
}

export default SongPage;
