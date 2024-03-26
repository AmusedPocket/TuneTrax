import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSongPlay, thunkGetSongs } from "../../redux/song";
import { selectAlbums, thunkGetAlbums } from "../../redux/album";
import { thunkGetPlaylist } from "../../redux/playlist";
import SingleSong from "../Songs/SingleSong";
import SingleAlbum from "./SingleAlbum";
import SinglePlaylist from "./SinglePlaylist";
import { selectSongArray } from "../../redux/song";
import './HomePage.css'
import { useSongContext } from "../../context/SongPlayerContext";
import { NavLink } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';

function HomePage() {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs.songs)
    // const albums = useSelector(selectAlbums())
    const albums = useSelector(state => state.albums)
    const playlists = useSelector(state => state.playlists);
    const [songContainer, setSongContainer] = useState({})
    const [albumContainer, setAlbumContainer] = useState({})
    const { songs: playingSongs, setSongs } = useSongContext()
    const [hasMore, setHasMore] = useState(true)
    

    // useEffect(() => {
    //     dispatch(thunkGetSongs())
    //     dispatch(thunkGetAlbums())
    //     dispatch(thunkGetPlaylist())

    // }, [])


    useEffect(() => {
        if (!albums) return;
        const tempContainer = {...albumContainer}
        for (let album of Object.values(albums)) {
            if (tempContainer[album.genre]) {
                tempContainer[album.genre].push(album)
            } else {
                tempContainer[album.genre] = [album]
            }
        }
        console.log("in the albums useeffect")
        setAlbumContainer(tempContainer)
    }, [albums])

    useEffect(() => {
        if (!songs) return;

        const tempContainer = {...songContainer}

        for (let song of Object.values(songs)) {
            if (tempContainer[song.genre]) {
                tempContainer[song.genre].push(song);
            } else {
                tempContainer[song.genre] = [song]
            }
        }
        console.log("in the songs use effect")
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

    // if (!songs || !Object.keys(albumContainer).length || !albums || !playlists) return "Loading..."

    const loadFunc = async (pageNum) => {
        
        
        const arr = ["Electronic", "Rock", "Pop", "Alternative", "Hauntology", "Classical", "Indie", "Rap", "Country", "Metal"];
        if(pageNum >= arr.length){
            setHasMore(false);
            
            return
        }
        await dispatch(thunkGetSongs([arr[pageNum]]))
        await dispatch(thunkGetAlbums([arr[pageNum]]))
        
    }

    return (
        <>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadFunc}
                hasMore={hasMore}
                initialLoad={true}
                threshold={50}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                {Object.keys(songContainer).map((genre, index) => {
                    return (<div className="home_page-genre-container" key={genre}>
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
                                    <h5><NavLink to={`/songs/${song.id}`}>{song.title}</NavLink></h5>
                                </div>
                            )}
                        </div>
                        <div className="home_page-album-container">
                            {albumContainer[genre]?.map((album) =>
                                <SingleAlbum album={album} />)}
                        </div>
                    </div>)
                })}
            </InfiniteScroll>
        </>
    )
}

export default HomePage;