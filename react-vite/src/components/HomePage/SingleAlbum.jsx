import { Link } from "react-router-dom";
import './SingleAlbum.css'

function SingleAlbum({ album }) {
    
    function firstFiveSongs(songs) {
        const res = [];
        for (let i = 0; i < Math.min(songs.length, 5); i++)
            res.push(songs[i]);
        return res;
    }
    console.log(album)
    return (
        <div className="single-album-container">
            <Link to={`/albums/${album.id}`}>
                <img src={album.album_pic} alt={`${album.title} album picture`} className="single-album-album"/>
            </Link>
            <div>
                {firstFiveSongs(album.songs).map(song => (
                    <div key={song.id}>
                        <Link to={`/songs/${song.id}`}>
                            <img src={song.song_pic} alt={`${song.title} song picture`} className="single-album-song-picture"/>
                        </Link>
                        <span className="first-five-album-song-text">{song.username} -- {song.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SingleAlbum;