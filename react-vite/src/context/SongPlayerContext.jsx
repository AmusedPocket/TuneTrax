import { createContext, useContext, useState } from "react";

export const SongContext = createContext()

export const useSongContext = () => useContext(SongContext)

export default function SongPlayerContext({children}) {
    const [songs, setSongs] = useState([])
    const [songTime, setSongTime] = useState()

    return(
        <SongContext.Provider value={{songs, setSongs, songTime, setSongTime}}>
            {children}
        </SongContext.Provider>
    )
}