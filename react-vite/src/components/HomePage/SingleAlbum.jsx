import { Link } from "react-router-dom";

function SingleAlbum({ album }) {
    
    function firstFiveSongs(songs) {
        const res = [];
        for (let i = 0; i < Math.min(songs.length, 5); i++)
            res.push(songs[i]);
        return res;
    }

    return (
        <div>
            <Link to={`/albums/${album.id}`}>
                <img src={album.album_pic} alt={`${album.title} album picture`} />
            </Link>
            <div>
                {firstFiveSongs(album.songs).map(song => (
                    <div key={song.id}>
                        <Link to={`/songs/${song.id}`}>
                            <img src={song.song_pic} alt={`${song.title} song picture`} />
                        </Link>
                        <span>{song.username} -- {song.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SingleAlbum;