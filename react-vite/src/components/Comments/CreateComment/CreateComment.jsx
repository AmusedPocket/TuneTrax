import { useState } from "react";
import { thunkPostComment } from "../../../redux/song";
import { useDispatch, useSelector } from "react-redux";
import { useSongContext } from "../../../context/SongPlayerContext";
import { useNavigate, redirect } from "react-router";



const CreateComment = ({song}) => {
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])
    const songId = song.id
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {songTime} = useSongContext()
    

    console.log("song id is: ", songId)
    
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

        dispatch(thunkPostComment(songId, newComment))
        setComment("")
        
    }

    return(
        <>
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
        </>
    )
}

export default CreateComment;