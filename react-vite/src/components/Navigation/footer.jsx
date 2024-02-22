import SongPlayer from "./SongPlayer/SongPlayer";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { thunkGetSongs } from "../../redux/song";

export default function Footer() {

     const dispatch = useDispatch()

     useEffect(() => {
          dispatch(thunkGetSongs())
     }, [dispatch])

     const allSongs = useSelector((state) => state.songs.songs)
     console.log("all songs", allSongs[10]?.song_link)

     // const eachSong = allSongs.map(song => )

     return (
          <SongPlayer />
     )
}
