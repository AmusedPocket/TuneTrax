import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSongs } from "../../redux/song";
import { thunkGetAlbums } from "../../redux/album";
import { thunkGetPlaylist } from "../../redux/playlist";
import SingleSong from "../Songs/SingleSong";
import SingleAlbum from "./SingleAlbum";
import SinglePlaylist from "./SinglePlaylist";

function HomePage() {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs.songs);
    const albums = useSelector(state => state.albums);
    const playlists = useSelector(state => state.playlists);

    useEffect(() => {
        dispatch(thunkGetSongs())
        dispatch(thunkGetAlbums())
        dispatch(thunkGetPlaylist())
    }, [])

    function mixFeed() {
        const res = [];
        let currLocation = 0;

        // Songs
        for (let song of Object.values(songs))
            res.push(["song", song]);

        // Albums
        for (let album of Object.values(albums)) {
            currLocation = (currLocation + 2) % (res?.length - 1);
            res.splice(currLocation, 0, ["album", album])
        }

        // Playlists
        for (let playlist of Object.values(playlists)) {
            currLocation = (currLocation + 3) % (res?.length - 1);
            res.splice(currLocation, 0, ["playlist", playlist])
        }

        return res;
    }

    if (!songs || !albums || !playlists) return "Loading..."
    return (
        <>
            {mixFeed().map((el, i) => {
                switch(el[0]) {
                    case "song":
                        return <SingleSong key={i} song={el[1]}/>;
                    case "album":
                        return <SingleAlbum key={i} album={el[1]}/>;
                    case "playlist":
                        return <SinglePlaylist key={i} playlist={el[1]}/>;
                }
            })}
        </>
    )
}

export default HomePage;