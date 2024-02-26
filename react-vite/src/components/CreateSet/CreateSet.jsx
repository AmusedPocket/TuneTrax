import { useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { thunkAddAlbum, thunkUpdateAlbum } from "../../redux/album"
import { thunkAddPlaylist, thunkUpdatePlaylist } from "../../redux/playlist"
import CreateSong from "../Songs/CreateSong";
import "./CreateSet.css"

function CreateSet({ editedSet, songFiles }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [errors, setErrors] = useState([]);
    const [validation, setValidation] = useState({});
    const [currentPage, setCurrentPage] = useState("basic info");
    const [disabled, setDisabled] = useState(false);

    const [albumImg, setAlbumImg] = useState(editedSet ? editedSet.image : "No Image");
    const [title, setTitle] = useState(editedSet ? editedSet.title : "");
    const [type, setType] = useState(editedSet ? editedSet.type : "Album");
    const [releaseDate, setReleaseDate] = useState(editedSet ? editedSet.release_date : "");
    const [description, setDescription] = useState(editedSet ? editedSet.body : "");
    const [songIds, setSongIds] = useState([])

    function onImageChange(e) {
        if (e.target.files && e.target.files[0]);
            setAlbumImg(URL.createObjectURL(e.target.files[0]));
    }
    
    async function onSubmit(e) {
        e.preventDefault();
        setErrors([])

        if (!editedSet && songFiles.length != songIds.length) {
            setValidation({tracks: "All tracks must be successfuly submitted."})
            return;
        }
        
        if (type == "Playlist") {
            alert("Posting playlist feature is coming soon!");
            return;
        }

        setDisabled(false);

        // Validations
        const tempValidation = {};
        if ("" == title) tempValidation.title = "Enter a title.";
        if ("Album" == type && "" == releaseDate) tempValidation.releaseDate = "Enter a release date for albums.";
        setValidation(tempValidation)

        // Unsuccessful Validation
        if (Object.values(tempValidation)?.length != 0) 
            return setDisabled(false);

        console.log("song", songFiles)
        console.log("image", albumImg)

        const payload = {
            title,
            album_pic: albumImg,
            body: description,
            release_date: releaseDate,
            songs: songIds.join(",")
        }

        if (editedSet) payload.id = editedSet.id;

        const response = await dispatch("Album" == type ? 
                                    (editedSet ? thunkUpdateAlbum(payload) : thunkAddAlbum(payload)) : 
                                    (editedSet ? thunkUpdatePlaylist(payload) : thunkAddPlaylist(payload)));

        // Unsuccessful Submission
        if (response.errors) { 
            setErrors(Object.keys(response.errors).reduce((acc, errKey) => 
                acc[errKey] = response.errors[errKey], {}));
            setDisabled(false);
            return;
        }

        // Successful Submission
        navigate(`/${"Album" == type ? "albums" : "playlists"}/${response.id}`);
    }
    
    function clearForm (e) {
        e.preventDefault();
        setAlbumImg("No Image");
        setTitle("");
        setType("Album");
        setReleaseDate("");
        setDescription("");
    }

    const addToSongList = (id) => {
        console.log([...songIds, id])
        setSongIds([...songIds, id])
    }

    return (
        <div className="upload-form_set">
            <h1>Create a Set</h1>
            <div>
                <h3 className={"tracks" != currentPage && "selected"} onClick={() => setCurrentPage("basic info")}>Basic info</h3>
                <h3 className={"basic info" != currentPage && "selected"} onClick={() => setCurrentPage("tracks")}>Tracks</h3>
            </div>
            {"tracks" == currentPage && (<>
                    {!editedSet && songFiles.map(songFile => <CreateSong key={songFile.tempId} songFile={songFile} addFunc={addToSongList} dontNavigate={true} />)}
                    {editedSet && <h1>Tracks cannot be edited en masse. Edit each track individually.</h1>}
                </>)}
            {"basic info" == currentPage && (<>
            <form onSubmit={onSubmit} className="upload-form_set_form">
                <div className="upload-form_set_image">
                    <img src={albumImg}/>
                    {albumImg == "No Image" &&
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={onImageChange}
                        />
                    }
                </div>
                <div className="upload-form_set_data">  
                    {errors.length != 0 && errors.map((error, i) => (<p key={i}>{error}</p>))}
                    <label>
                        Title {/* TODO: make asterisk red */}*
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                    </label>
                    {validation.title && <p>{validation.title}</p>}
                    <div>
                        <label>
                            Set type 
                            <select
                                type="select"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                >
                                <option value="Album" defaultValue>Album</option>
                                <option value="Playlist">Playlist</option>
                            </select>
                        </label>
                        <label>
                            Release date {"Album" == type && "*"}{/* TODO: make asterisk red */}
                            <input
                                type="date"
                                value={releaseDate}
                                onChange={(e) => setReleaseDate(e.target.value)}
                                />
                        </label>
                        {validation.releaseDate && <p>{validation.releaseDate}</p>}
                    </div> 
                    <label>
                        Description
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                    </label>
                    {validation.tracks && <p>{validation.tracks}</p>}
                    <span>{/* TODO: make asterisk red */}* Required fields</span>
                    <div className="upload-form_set_button-container">
                        <button type="cancel" onClick={clearForm}>Cancel</button>
                        <button type="submit" disabled={disabled}>Submit</button>
                    </div>
                </div>
            </form>
            </>)}
        </div>
    );
}

export default CreateSet;