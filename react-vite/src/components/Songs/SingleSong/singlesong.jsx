import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import SongPlayer from "../../Navigation/SongPlayer/SongPlayer";
import AudioPlayer from 'react-h5-audio-player';

const SingleSong = ({song}) => {
    const { songId } = useParams()
    const picture = song.song_pic ? song.song_pic: (song.albums ? song.albums[0].album_pic : "No Image") 
    console.log(song)
    return(
        <div className="single-song-container">
            {/* <AudioPlayer
            autoPlay
            src={song.song_link}
            onPlay={(e) => console.log("onPlay")}
        // other props here
        /> */}
            <p>{song.user.username}</p>
            {song.albums && <p>{song.albums[0].title}</p>}
            <p>{song.title}</p>
            <p>#{song.genre}</p>
            <p>{song.plays}</p>
            <Link to={`/songs/${song.id}`}>
                <img src={picture}/>
            </Link>
        
        </div>
    )
}

export default SingleSong;