import SongPlayer from "./SongPlayer/SongPlayer";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { thunkGetSongs } from "../../redux/song";

export default function Footer() {

     const dispatch = useDispatch()

  

     // const eachSong = allSongs.map(song => )

     return (
          <SongPlayer />
     )
}
