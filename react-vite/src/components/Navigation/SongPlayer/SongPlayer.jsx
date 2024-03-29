import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { createRef, useState } from "react";
import { useSongContext } from "../../../context/SongPlayerContext";
import "./SongPlayer.css"

const SongPlayer = () => {
  const {songs, setSongs, prevSongs, setPrevSongs, songTime, setSongTime} = useSongContext()
  const player = createRef();

  function skipToNextSong(e) {
    const newSongs = [...prevSongs]
    if (songs[0]) {
      newSongs.unshift(songs[0])
      setPrevSongs(newSongs);
    }
    const tempSongs = [...songs];
    tempSongs.shift();
    setSongs(tempSongs);
    if (!tempSongs.length) player.current.audio.current.audio = null;

    console.log("skip\nsongs:", tempSongs, "\nprev songs:", newSongs)
  }

  function skipToPreviousSong(e) {
    if (songTime > 2) {
      console.log("Starting over")
      player.current.audio.current.currentTime = 0;
      return;
    }
    const newSongs = [...songs]
    if (prevSongs[0]) {
      newSongs.unshift(prevSongs[0])
      setSongs(newSongs)
    }
    const tempSongs = [...prevSongs];
    tempSongs.shift();
    setPrevSongs(tempSongs);

    console.log("prev\nsongs:", newSongs, "\nprev songs:", tempSongs)
  }

  return (
    <div className="react-h5-audio-player">
      <AudioPlayer
        // autoPlay
        ref={player}
        volume={0.1}
        showSkipControls
        showJumpControls
        customProgressBarSection={
          [
            <span key={"WHY DONT YOU STOP YELLING"}>{songs.length ? songs[0].songName : "-"}</span>,
            RHAP_UI.CURRENT_TIME,
            <div key={"STOP YELLING AT ME"}>|</div>,
            RHAP_UI.DURATION
          ]
        }
        onListen={(e) => setSongTime(e.target.currentTime)}
        listenInterval={1}
        src={songs.length ? songs[0].songLink : ""}
        onClickNext={skipToNextSong}
        onClickPrevious={skipToPreviousSong}
        // onListen={true}
      />
    </div>
  );
};

export default SongPlayer;
