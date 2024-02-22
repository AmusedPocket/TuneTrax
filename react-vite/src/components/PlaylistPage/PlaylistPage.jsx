import { useDispatch, useSelector } from "react-redux"
import { selectSinglePlaylist, thunkGetPlaylist } from "../../redux/playlist";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeletePlaylistModal from "../DeletePlaylistModal";

function PlaylistPage() {
    const { playlistId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const playlist = useSelector(selectSinglePlaylist(playlistId));
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(thunkGetPlaylist(playlistId));
    }, [dispatch, playlistId])

    function calcDateSince(release_date){
        const timeSince = new Date() - new Date(release_date);
        const oneDay = 60 * 60 * 24 * 1000;
        const oneMonth = oneDay * 31;
        const oneYear = oneDay * 365;

        if (timeSince < oneDay) return "today"
        if (timeSince < oneMonth) return `${Math.floor(timeSince / oneDay)} day${timeSince/oneDay >= 2 ? "s":""} ago`;
        if (timeSince < oneYear) return `${Math.floor(timeSince / oneMonth)} month${timeSince/oneMonth >= 2 ? "s":""} ago`;
        return `${Math.floor(timeSince / oneYear)} year${timeSince/oneYear >= 2 ? "s":""} ago`;
    }

    function calcSongGenres(songs) {
        const set = new Set();
        const res = [];

        for (let song of songs)
            if (!set.has(song.genre)) {
                set.add(song.genre);
                res.push(song.genre);
            }

        return res;
    }

    function firstEightLikedPFP(likes) {
        let res = [];
        for (let i = 0; i < Math.min(likes?.length, 8); i++)
            res.push(likes[i]);
        return res;
    }

    if (!playlist) return(
        <>
            <h1>This playlist doesn&apos;t exist...</h1>
            <h5>sad noot noot</h5>
        </>
    );
    return (
        <>
            <div>{/* head container */}
                <div> {/* Left side */}
                    <div> {/* top */}
                        <div>
                            <div>play playlist</div>
                            <div>
                                <span>{playlist.title}</span>
                                <span>{playlist.user.username}</span>
                            </div>
                        </div>
                        <div>
                            <span>released:</span>
                            <span>{calcDateSince(playlist.release_date)}</span>
                            <div>
                                {calcSongGenres(playlist.songs).map(genre => <span key={genre}>#{genre}</span>)}
                            </div>
                        </div>
                    </div>
                    <div> {/* bottom */}
                        {/* if not played */}
                        <div>
                            <span>{playlist.songs?.length}</span>
                            <span>TRACKS</span>
                            {/* TODO song length */}
                        </div>
                        {/* if played */}
                        {/* TODO show waveform */}
                    </div>
                </div>
                <img src={playlist.playlist_pic} alt={`${playlist.title} cover image`}/>
            </div>
            <div> {/* body container */}
                <div> {/* left side - playlist/user data */}
                    <div> {/* top */}
                        <div>
                            <button>like</button>
                            <button>share</button>
                            {playlist.user.id == sessionUser?.id && <button onClick={() => navigate(`/playlists/${playlist.id}/edit`)}>edit</button>}
                            <button>copy link</button>
                            {playlist.user.id == sessionUser?.id && 
                                <button>
                                    <OpenModalMenuItem
                                        itemText="delete"
                                        modalComponent={<DeletePlaylistModal playlistId={playlistId} navigate={navigate} />}
                                    />
                                </button>
                            }
                            {/* TODO: add queue <button>add to next up</button> */}
                        </div>
                        <div>
                            <a>{playlist.likes?.length}</a>
                        </div>
                    </div>
                    <div> {/* bottom */}
                        <div> {/* left side - user stuff */}
                            {playlist.user.profile_pic && <img src={playlist.user.profile_pic} alt={`${playlist.user?.username} profile image`}/>}
                            {!playlist.user.profile_pic && <div> default colored profile picture </div>}
                            {/* TODO: route to user page */} <NavLink>{playlist.user?.username}</NavLink>
                            <div>
                                <NavLink>{playlist.user.follows}</NavLink>
                                <NavLink>{playlist.user.songs?.length}</NavLink>
                            </div>
                            <button>Follow</button>
                        </div>
                        <div> {/* right side */}
                            <span>{playlist.body}</span>
                            {playlist.songs.map((song, index) => (
                                <NavLink key={song.id}>
                                    <img src={song.song_pic} alt={`${song.title} song image`}/>
                                    <span>{index + 1}</span>
                                    <span>{song.username} - {song.title}</span>
                                    <span>{song.likes}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
                <div> {/* right side - user playlists, user playlists, likes, reposts */}
                    <div>
                        <div>
                            <span>Playlists from this user</span>
                            {/* TODO: route to user page/playlists */}<NavLink>View All</NavLink>
                        </div>
                        {playlist.user.playlists.map(new_playlist => new_playlist.id != playlist.id ? (
                            <div key={new_playlist.id}>
                                <img src={new_playlist.playlist_pic} alt={`${new_playlist.title} playlist image`}/>
                                <div>
                                    <span>{playlist.user?.username}</span>
                                    <span>{new_playlist.title}</span>
                                    <span>Playlist &bull; {new Date(new_playlist.release_date).getFullYear()}</span>
                                </div>
                            </div>
                        ) : (null))}
                    </div>
                    <div>
                        <div>
                            <span>Playlists from this user</span>
                            {/* TODO: route to user page/plsylists */}<NavLink>View All</NavLink>
                        </div>
                        {playlist.user.playlists.map(playlist => (
                            <div key={playlist.id}>
                                <img src={playlist.playlist_pic} alt={`${playlist.title} playlist image`}/>
                                <div>
                                    <span>{playlist.user?.username}</span>
                                    <span>{playlist.title}</span>
                                    <span>Playlist &bull; {new Date(playlist.created_at).getFullYear()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div>
                            <span>{playlist.likes?.length} likes</span>
                            {/* TODO: route to user page/plsylists */}<NavLink>View All</NavLink>
                        </div>
                        {firstEightLikedPFP(playlist.likes).map(like_user => (
                            <div key={like_user.id}>
                                {like_user.profile_pic && <img src={like_user.profile_pic} alt={`${like_user?.username} profile image`}/>}
                                {!like_user.profile_pic && <div> default colored profile picture </div>}
                            </div>)
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlaylistPage