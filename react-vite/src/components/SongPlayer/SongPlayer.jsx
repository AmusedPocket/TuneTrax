import AudioPlayer from 'react-h5-audio-player';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, } from 'react-router-dom';
import { useEffect } from 'react';
import { thunkGetSong } from '../../redux/song';


const SongPlayer = () => {
    const { songId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetSong(songId))
    }, [dispatch, songId])
    
    const song = useSelector((state)=>state.songs)

    return (
        <>
        
         <AudioPlayer
            
            autoPlay
            showFilledVolume={true}
            src={song.songs.song_link}
            onPlay={(e) => console.log("onPlay")}
            onListen={true}
            volume={1.0}
        />
        </>
       
    )
};

export default SongPlayer;