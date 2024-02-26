import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./DeletePlaylist.css";
import { thunkDeletePlaylist } from "../../redux/playlist";

function DeletePlaylistModal({ playlistId, navigate }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const deletePlaylist = async (e) => {
        e.preventDefault();
        await dispatch(thunkDeletePlaylist(playlistId));
        navigate(`/`);
        closeModal();
    }

    const keepPlaylist = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <>
            <form className="DeleteForm">
                <h1>Confirm Delete</h1>
                <h3>Are you sure you want to delete this event?</h3>
                <button onClick={() => alert("Feature coming soon!")}>Yes (Delete Playlist)</button>
                <button onClick={keepPlaylist}>No (Keep Playlist)</button>
            </form>
        </>
    )
}

export default DeletePlaylistModal;