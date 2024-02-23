import { Link } from "react-router-dom";

function SinglePlaylist({ playlist }) {
    
    function firstFiveSongs(songs) {
        const res = [];
        for (let i = 0; i < Math.min(songs.length, 5); i++)
            res.push(songs[i]);
        return res;
    }

    return (
        <div>
            <Link to={`/playlist/${playlist.id}`}>
            <img src={playlist.playlist_pic} alt={`${playlist.title} playlist picture`} />
            </Link>
            <div>
                {firstFiveSongs(playlist.songs).map(song => (
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

export default SinglePlaylist;