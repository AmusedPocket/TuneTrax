import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkPostSong } from "../../../redux/song";
import { useNavigate } from "react-router";


const UploadSong = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [songFile, setSongFile] = useState()
    
    function onSongChange(e){
        if (e.target.files && e.target.files[0]);
            setSongFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <>
            <input 
            type="file"
            accept="audio/*"
            onChange={onSongChange}
            />
        </>
    )
}

export default UploadSong;