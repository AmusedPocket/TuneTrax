import { useState } from "react";
import { thunkEditComment, thunkGetSong} from "../../../redux/song";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";


const EditComment = ({comment}) => {
    const [commentText, setCommentText] = useState(comment.comment)
    const songId = comment.song_id
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    console.log("songId is: ", songId)

    const submitEdit = async (e) => {
        e.preventDefault();
        const edits = {
            comment: commentText
        }

        const response = await dispatch(thunkEditComment(songId, edits))
        if(response.ok){
            await dispatch(thunkGetSong(songId))
        }
        closeModal()
    }

    return (
        <>
        <form onSubmit={submitEdit}>
            <textarea
            value={commentText}
            placeholder=""
            onChange={(e)=> setCommentText(e.target.value)}
            />
            <button onSubmit={submitEdit} type="submit">Submit Edit</button>
        </form>
        </>
    )
}

export default EditComment;
