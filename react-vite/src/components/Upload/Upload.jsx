import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkPostSong } from "../../redux/song";
import { useNavigate } from "react-router";
import CreateSong from "../Songs/CreateSong";
import CreateSet from "../CreateSet";


const Upload = () => {

    const [songFiles, setSongFiles] = useState()

    function onSongChange(e) {
        console.log("e target files", e.target.files)
        if (e.target.files) {
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
            {songFiles && songFiles.length === 1 &&
                <>
                    <CreateSong songFile={songFiles[0]} />
                </>}
            {songFiles && songFiles.length > 1 &&
                <>
                    <CreateSet songFiles={songFiles} />
                </>}
        </>
    )
}

export default Upload;