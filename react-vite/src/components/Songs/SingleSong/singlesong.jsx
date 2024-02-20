import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const SingleSong = ({song}) => {
    const { songId } = useParams()
    const picture = song.song_pic ? song.song_pic: song.albums[0].album_pic 

    return(
        <div className="single-song-container">
            <p>{song.user.username}</p>
            <p>{song.albums[0].title}</p>
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