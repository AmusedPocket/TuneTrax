import { createContext, useContext, useEffect, useState } from "react";


export const SongContext = createContext()

export const useSongContext = () => useContext(SongContext)

export default function SongPlayerContext({children}) {
    const [songs, setSongs] = useState([])
    const [songTime, setSongTime] = useState(0)

    useEffect(()=> {
        if(songs.length){
          sessionStorage.setItem("songs", JSON.stringify(songs))
        }
      }, [songs])
    
      useEffect(()=>{
        if(songTime){
          sessionStorage.setItem("song time", songTime)
        }
      }, [songTime])

      useEffect(()=>{
        const songs_ss = sessionStorage.getItem("songs")
        const songTime_ss = sessionStorage.getItem("song time")
        if(songs_ss) setSongs(JSON.parse(songs_ss)) 
        else setSongs([])
    
        if(songTime_ss) setSongTime(JSON.parse(songTime_ss))
        const element = document.querySelector("audio")
        if(element){
            element.currentTime = songTime_ss
            
            }
      }, [])

    return(
        <SongContext.Provider value={{songs, setSongs, songTime, setSongTime}}>
            {children}
        </SongContext.Provider>
    )
}