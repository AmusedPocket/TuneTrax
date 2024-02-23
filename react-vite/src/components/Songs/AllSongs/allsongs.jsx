import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSongs } from "../../../redux/song";
import SingleSong from "../SingleSong";
import SongPlayer from "../../Navigation/SongPlayer/SongPlayer";



const AllSongs = () => {
    const dispatch = useDispatch()
    const allSongs = useSelector((state) => state.songs.songs)
    const allSongsArray = Object.values(allSongs)
    
    useEffect(()=> {
        dispatch(thunkGetSongs())
    }, [dispatch])
    
    const songItems = allSongsArray.map((song)=>{
        return <SingleSong key={song.id} song={song} />
    })

    return(
        <h1>{songItems}</h1>

    )
}

export default AllSongs;