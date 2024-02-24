import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { thunkAddLike } from "../../../redux/song";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const SingleSong = ({song}) => {
    const dispatch = useDispatch()
    const picture = song.song_pic ? song.song_pic: (song.albums ? song.albums[0].album_pic : "No Image") 
    const currentUser = useSelector((state)=>state.session.user)
    const [currentLikes, setCurrentLikes] = useState(0)
    const [canLike, setCanLike] = useState(false)

    useEffect(()=>{
        if(song) setCurrentLikes(song.likes)
    }, [song])

    const likeClick = () => {
        setCanLike(true)
        dispatch(thunkAddLike(song.id, currentUser))
            .then(result =>{ 
                song.likes += result
                console.log("after dispatch: ", song.likes)
                setCurrentLikes(song.likes)
                setCanLike(false)
            })
    }

    return(
        <div className="single-song-container">
            <p>{song.username}</p>
            {song.albums && <p>{song.albums[0].title}</p>}
            <p>{song.title}</p>
            <p>#{song.genre}</p>
            <p>{song.plays}</p>
            <p><button onClick={()=>likeClick()} disabled={canLike}><i className="fa-solid fa-heart">{currentLikes}</i></button></p>
            <Link to={`/songs/${song.id}`}>
                <img src={picture}/>
            </Link>
        
        </div>
    )
}

export default SingleSong;