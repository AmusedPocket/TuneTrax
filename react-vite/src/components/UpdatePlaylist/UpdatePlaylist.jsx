import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { selectSinglePlaylist, thunkGetPlaylist } from "../../redux/playlist"
import CreateSet from "../CreateSet";

function UpdatePlaylist() {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const playlist = useSelector(selectSinglePlaylist(playlistId));

    useEffect(() => {
        dispatch(thunkGetPlaylist(playlistId));
    }, [dispatch, playlistId])
    
    if (!playlist) return <></>;

    playlist.image = playlist.playlist_pic;
    playlist.type = "Playlist";

    return (
        <>
            <CreateSet editedSet={playlist}/>
        </>    
    );
}

export default UpdatePlaylist;