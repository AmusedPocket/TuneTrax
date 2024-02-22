import { useDispatch, useSelector } from "react-redux"
import { selectSingleAlbum, thunkGetAlbum } from "../../redux/album";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteAlbumModal from "../DeleteAlbumModal";

function AlbumPage() {
    const { albumId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const album = useSelector(selectSingleAlbum(albumId));
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(thunkGetAlbum(albumId));
    }, [dispatch, albumId])

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

    if (!album) return(
        <>
            <h1>This album doesn&apos;t exist...</h1>
            <h5>sad noot noot</h5>
        </>
    );
    return (
        <>
            <div>{/* head container */}
                <div> {/* Left side */}
                    <div> {/* top */}
                        <div>
                            <div>play album</div>
                            <div>
                                <span>{album.title}</span>
                                <span>{album.user.username}</span>
                            </div>
                        </div>
                        <div>
                            <span>released:</span>
                            <span>{calcDateSince(album.release_date)}</span>
                            <div>
                                {calcSongGenres(album.songs).map(genre => <span key={genre}>#{genre}</span>)}
                            </div>
                        </div>
                    </div>
                    <div> {/* bottom */}
                        {/* if not played */}
                        <div>
                            <span>{album.songs?.length}</span>
                            <span>TRACKS</span>
                            {/* TODO song length */}
                        </div>
                        {/* if played */}
                        {/* TODO show waveform */}
                    </div>
                </div>
                <img src={album.album_pic} alt={`${album.title} cover image`}/>
            </div>
            <div> {/* body container */}
                <div> {/* left side - album/user data */}
                    <div> {/* top */}
                        <div>
                            <button>like</button>
                            <button>share</button>
                            {album.user.id == sessionUser?.id && <button onClick={() => navigate(`/albums/${album.id}/edit`)}>edit</button>}
                            <button>copy link</button>
                            {album.user.id == sessionUser?.id && 
                                <button>
                                    <OpenModalMenuItem
                                        itemText="delete"
                                        modalComponent={<DeleteAlbumModal albumId={albumId} navigate={navigate} />}
                                    />
                                </button>
                            }
                            {/* TODO: add queue <button>add to next up</button> */}
                        </div>
                        <div>
                            <a>{album.likes?.length}</a>
                        </div>
                    </div>
                    <div> {/* bottom */}
                        <div> {/* left side - user stuff */}
                            {album.user.profile_pic && <img src={album.user.profile_pic} alt={`${album.user.username} profile image`}/>}
                            {!album.user.profile_pic && <div> default colored profile picture </div>}
                            {/* TODO: route to user page */} <NavLink>{album.user.username}</NavLink>
                            <div>
                                <NavLink>{album.user.follows}</NavLink>
                                <NavLink>{album.user.songs?.length}</NavLink>
                            </div>
                            <button>Follow</button>
                        </div>
                        <div> {/* right side */}
                            <span>{album.body}</span>
                            {album.songs.map((song, index) => (
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
                <div> {/* right side - user albums, user playlists, likes, reposts */}
                    <div>
                        <div>
                            <span>Albums from this user</span>
                            {/* TODO: route to user page/albums */}<NavLink>View All</NavLink>
                        </div>
                        {album.user.albums.map(new_album => new_album.id != album.id ? (
                            <div key={new_album.id}>
                                <img src={new_album.album_pic} alt={`${new_album.title} album image`}/>
                                <div>
                                    <span>{album.user.username}</span>
                                    <span>{new_album.title}</span>
                                    <span>Album &bull; {new Date(new_album.release_date).getFullYear()}</span>
                                </div>
                            </div>
                        ) : (null))}
                    </div>
                    <div>
                        <div>
                            <span>Playlists from this user</span>
                            {/* TODO: route to user page/plsylists */}<NavLink>View All</NavLink>
                        </div>
                        {album.user.playlists.map(playlist => (
                            <div key={playlist.id}>
                                <img src={playlist.playlist_pic} alt={`${playlist.title} playlist image`}/>
                                <div>
                                    <span>{album.user.username}</span>
                                    <span>{playlist.title}</span>
                                    <span>Playlist &bull; {new Date(playlist.created_at).getFullYear()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div>
                            <span>{album.likes?.length} likes</span>
                            {/* TODO: route to user page/plsylists */}<NavLink>View All</NavLink>
                        </div>
                        {firstEightLikedPFP(album.likes).map(like_user => (
                            <div key={like_user.id}>
                                {like_user.profile_pic && <img src={like_user.profile_pic} alt={`${like_user.username} profile image`}/>}
                                {!like_user.profile_pic && <div> default colored profile picture </div>}
                            </div>)
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AlbumPage