import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateSong from "../Songs/CreateSong";
import CreateSet from "../CreateSet";
import "./Upload.css"

const Upload = () => {
    const [songFiles, setSongFiles] = useState()
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user)

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
            <div className="upload-form_container">
                {!songFiles &&
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={onSongChange}
                        disabled={user === null}
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
            </div>
        </>
    )
}

export default Upload;