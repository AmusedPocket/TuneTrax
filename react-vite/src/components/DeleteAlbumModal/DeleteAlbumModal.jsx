import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./DeleteAlbum.css";
import { thunkDeleteAlbum } from "../../redux/album";

function DeleteAlbumModal({ albumId, navigate }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const deleteAlbum = async (e) => {
        e.preventDefault();
        await dispatch(thunkDeleteAlbum(albumId));
        navigate(`/`);
        closeModal();
    }

    const keepAlbum = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <>
            <form className="DeleteForm">
                <h1>Confirm Delete</h1>
                <h3>Are you sure you want to delete this Album?</h3>
                <button onClick={deleteAlbum}>Yes (Delete Album)</button>
                <button onClick={keepAlbum}>No (Keep Album)</button>
            </form>
        </>
    )
}

export default DeleteAlbumModal;