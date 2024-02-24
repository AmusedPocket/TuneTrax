import { useState } from "react";
import CreateSong from "../Songs/CreateSong";
import CreateSet from "../CreateSet";


const Upload = () => {
    const [songFiles, setSongFiles] = useState()

    function onSongChange(e) {
        console.log("e target files", e.target.files)
        if (e.target.files) {
            const songList = [];
            for (let i = 0; i < e.target.files?.length; i++) {
                e.target.files[i].tempId = i;
                songList.push(e.target.files[i]);
            }
            setSongFiles(Object.values(e.target.files));
        }
    }

    return (
        <>
            {!songFiles &&
                <input
                    type="file"
                    accept="audio/*"
                    onChange={onSongChange}
                    multiple
                />}
            {songFiles && songFiles?.length === 1 &&
                <>
                    <CreateSong songFile={songFiles[0]} />
                </>}
            {songFiles && songFiles?.length > 1 &&
                <>
                    <CreateSet songFiles={songFiles} />
                </>}
        </>
    )
}

export default Upload;