import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./DeleteSong.css";
import { thunkDeleteSong } from "../../redux/song";

function DeleteSongModal({ songId, navigate }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const deleteSong = async (e) => {
        e.preventDefault();
        await dispatch(thunkDeleteSong(songId));
        navigate(`/`);
        closeModal();
    }

    const keepSong = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <>
            <form className="DeleteForm">
                <h1>Confirm Delete</h1>
                <h3>Are you sure you want to delete this Song?</h3>
                <button onClick={deleteSong}>Yes (Delete Song)</button>
                <button onClick={keepSong}>No (Keep Song)</button>
            </form>
        </>
    )
}

export default DeleteSongModal;