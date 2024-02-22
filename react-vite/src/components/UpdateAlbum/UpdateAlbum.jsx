import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { selectSingleAlbum, thunkGetAlbum } from "../../redux/album"
import CreateSet from "../CreateSet";

function UpdateAlbum() {
    const dispatch = useDispatch();
    const { albumId } = useParams();
    const album = useSelector(selectSingleAlbum(albumId));

    useEffect(() => {
        dispatch(thunkGetAlbum(albumId));
    }, [dispatch, albumId])
    
    if (!album) return <></>;

    album.image = album.album_pic;
    album.type = "Album";

    return (
        <>
            <CreateSet editedSet={album}/>
        </>    
    );
}

export default UpdateAlbum;