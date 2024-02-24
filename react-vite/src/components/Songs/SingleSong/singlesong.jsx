import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { thunkAddLike } from "../../../redux/song";
import { useDispatch } from "react-redux";

const SingleSong = ({song}) => {
    const dispatch = useDispatch()
    const picture = song.song_pic ? song.song_pic: (song.albums ? song.albums[0].album_pic : "No Image") 
    const currentUser = useSelector((state)=>state.session.user)
    const [currentLikes, setCurrentLikes] = useState(song.likes)

    // console.log("Song is =============>", song)

    const likeClick = () => {
        // const song_likes = song.likes;
        console.log("before dispatch: ", song.likes)
        dispatch(thunkAddLike(song.id, currentUser))
            .then(result =>{ 
                song.likes += result
                console.log("after dispatch: ", song.likes)
                setCurrentLikes(song.likes)
            })
    }

    return(
        <div className="single-song-container">
            <p>{song.username}</p>
            {song.albums && <p>{song.albums[0].title}</p>}
            <p>{song.title}</p>
            <p>#{song.genre}</p>
            <p>{song.plays}</p>
            <p><button onClick={()=>likeClick()}><i className="fa-solid fa-heart">{currentLikes}</i></button></p>
            <Link to={`/songs/${song.id}`}>
                <img src={picture}/>
            </Link>
        
        </div>
    )
}

export default SingleSong;