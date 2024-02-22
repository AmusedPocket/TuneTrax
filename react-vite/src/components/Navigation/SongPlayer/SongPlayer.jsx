import AudioPlayer from "react-h5-audio-player";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { thunkGetSong } from "../../../redux/song";
import "./SongPlayer.css"

const SongPlayer = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetSong(songId));
  }, [dispatch, songId]);

  const song = useSelector((state) => state.songs);
  // const song_like = song.songs.song_link

  return (
    <div className="react-h5-audio-player">
      <AudioPlayer
        autoPlay
        volume={0.1}
        showFilledVolume={true}
        showFilledProgress={true}
        progressUpdateInterval={100}
        src={song.songs.song_link}
        onPlay={(e) => console.log("onPlay")}
        // onListen={true}
      />
    </div>
  );
};

export default SongPlayer;
