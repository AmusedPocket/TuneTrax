import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSongPlay, thunkGetSongs } from "../../redux/song";
import { thunkGetAlbums } from "../../redux/album";
import { thunkGetPlaylist } from "../../redux/playlist";
import SingleSong from "../Songs/SingleSong";
import SingleAlbum from "./SingleAlbum";
import SinglePlaylist from "./SinglePlaylist";
import { selectSongArray } from "../../redux/song";
import './HomePage.css'
import { useSongContext } from "../../context/SongPlayerContext";

function HomePage() {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs.songs)
    const albums = useSelector(state => state.albums);
    const playlists = useSelector(state => state.playlists);
    const [songContainer, setSongContainer] = useState({})
    const [albumContainer, setAlbumContainer] = useState({})
    const { songs: playingSongs, setSongs } = useSongContext()

    useEffect(() => {
        dispatch(thunkGetSongs())
        dispatch(thunkGetAlbums())
        dispatch(thunkGetPlaylist())
    }, [])


    useEffect(() => {
        if (!songs) return;

        const tempContainer = {}

        for (let song of Object.values(songs)) {
            if (tempContainer[song.genre]) {
                tempContainer[song.genre].push(song);
            } else {
                tempContainer[song.genre] = [song]
            }
        }

        setSongContainer(tempContainer)
    }, [setSongContainer, songs])

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

    const playSong = async (songId) => {
        const songData = await dispatch(thunkGetSongPlay(songId))
        // TO-DO: error handling
        if (songData.errors) return;
        setSongs = setSongs([{
            songLink: songData.song_link,
            songPic: songData.song_pic,
            songName: songData.title,
            songId: songData.id
        }, ...playingSongs])

    }

    if (!songs || !albums || !playlists) return "Loading..."
    return (
        <>
            {/* {mixFeed().map((el, i) => {
                switch(el[0]) {
                    case "song":
                        return <SingleSong key={i} song={el[1]}/>;
                    case "album":
                        return <SingleAlbum key={i} album={el[1]}/>;
                    case "playlist":
                        return <SinglePlaylist key={i} playlist={el[1]}/>;
                }
            })} */}
            {Object.keys(songContainer).map((genre) => {
                return (<div key={genre}>
                    <h3>{genre}</h3>
                    <div className="home_page-song-container">
                        {songContainer[genre].map((song) =>
                            <div key={song.id} className="home_page-song">
                                <div onClick={() => playSong(song.id)}>

                                    {(song.song_pic && song.song_pic !== "No Image") && <img
                                        src={song.song_pic}
                                        className="home_page-song-image"

                                    />}
                                    {(!song.song_pic || song.song_pic === "No Image") && <div className="default-pic home_page-song-image" />}
                                    <div className="home_page-song-container-play">
                                        <div className="play-button fa-solid fa-play" />
                                    </div>
                                </div>
                                <h5>{song.title}</h5>
                            </div>
                        )}
                    </div>
                </div>)
            })}
        </>
    )
}

export default HomePage;