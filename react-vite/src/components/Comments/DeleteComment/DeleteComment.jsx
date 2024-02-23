import { useModal } from "../../../context/Modal";
import { thunkDeleteComment } from "../../../redux/song";
import { useDispatch } from "react-redux";

const DeleteComment = ({comment, songComments}) => {
     const { closeModal } = useModal();
     const dispatch = useDispatch();
     const songId = comment.song_id;
     const commentId = comment.id;
     console.log("comments are====>", songComments)

     const yesButtonClick = async () => {
          const response = await dispatch(thunkDeleteComment(songId, commentId))
          if(response.ok){
               closeModal()
          }
     }

     return(
          <>
               <h2>Confirm Delete</h2>
               <button onClick={yesButtonClick}>Yes</button>
               <button onClick={closeModal}>No</button>
          </>
     )
}


export default DeleteComment;
