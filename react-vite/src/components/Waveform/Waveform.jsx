import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import WaveSurfer from 'wavesurfer.js'
import { useSongContext } from '../../context/SongPlayerContext'

const Waveform = ({ audio }) => {
    const containerRef = useRef()
    const {songs, setSongs, songTime} = useSongContext()
    const [audioContainer, sestAudioContainer] = useState();

    useEffect(() => {
        console.log(audioContainer)
        if (audioContainer && songs[0]?.songId === audio.id) {
            audioContainer.currentTime = songTime;
        }
    }, [songTime])

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
            barGap:1,
            barWidth:3,
            barRadius:5,
            barAlign:"bottom",
            dragToSeek:true,
            progressColor: ["#EF912B", "#EF3E2B"],
            waveColor: ["#FFFFFF", "#FFFFAB"],
            cursorColor: "#000433",
        })
        waveSurfer.load(audio.song_link)

        sestAudioContainer(document.querySelector(`#waveSurfer_${audio.id} > div`)
                            .shadowRoot.querySelector("audio"));

        return () => {
            waveSurfer.destroy()
        }
    }, [audio])

    return <div id={`waveSurfer_${audio.id}`} ref={containerRef} />
}

Waveform.propTypes = {
    audio: PropTypes.string.isRequired,
}

export default Waveform