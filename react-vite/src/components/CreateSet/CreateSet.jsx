import { useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { thunkAddAlbum, thunkUpdateAlbum } from "../../redux/album"
import { thunkAddPlaylist, thunkUpdatePlaylist } from "../../redux/playlist"

function CreateSet({ editedSet }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [validation, setValidation] = useState({});
    const [currentPage, setCurrentPage] = useState("basic info");
    const [disabled, setDisabled] = useState(false);

    const [songs, setSongs] = useState(editedSet ? editedSet.songs : []);
    const [albumImg, setAlbumImg] = useState(editedSet ? editedSet.image : "No Image");
    const [title, setTitle] = useState(editedSet ? editedSet.title : "");
    const [type, setType] = useState(editedSet ? editedSet.type : "Album");
    const [releaseDate, setReleaseDate] = useState(editedSet ? editedSet.release_date : "");
    const [description, setDescription] = useState(editedSet ? editedSet.body : "");
    const [privacy, setPrivacy] = useState(false);

    function onImageChange(e) {
        if (e.target.files && e.target.files[0]);
            setAlbumImg(URL.createObjectURL(e.target.files[0]));
    }
    
    async function onSubmit(e) {
        e.preventDefault();
        setDisabled(false);

        // Validations
        const tempValidation = {};
        if ("" == title) tempValidation.title = "Enter a title.";
        if ("Album" == type && "" == releaseDate) tempValidation.releaseDate = "Enter a release date for albums.";
        setValidation(tempValidation)

        // Unsuccessful Validation
        if (Object.values(tempValidation).length != 0) 
            return setDisabled(false);

        const payload = {
            title,
            album_pic: albumImg,
            body: description,
            privacy,
            release_date: releaseDate,
            songs,
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
    
    return (
        <>
            <div>
                <span onClick={() => setCurrentPage("basic info")}>Basic info</span>
                <span onClick={() => setCurrentPage("tracks")}>Tracks</span>
            </div>
            <form onSubmit={onSubmit}>
                {"tracks" == currentPage && (<>=
                    {/* TODO: show tracks for set */}
                </>)}
                {"basic info" == currentPage && (<>
                <div>
                    <img src={albumImg}/>
                    {/* hide when image is selected */}
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={onImageChange}
                        />
                </div>
                <div>  
                    {errors.errors && errors.errors.map((error, i) => (<div key={i}>{error}</div>))}
                    <label>
                        Title {/* TODO: make asterisk red */}*
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        {validation.title && <span>{validation.title}</span>}
                    </label>
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
                            {validation.releaseDate && <span>{validation.releaseDate}</span>}
                        </label>
                    </div> 
                    <label>
                        Description
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                    </label>
                    <span>Privacy:</span>
                    <label>
                        <input
                            type="radio"
                            onChange={() => setPrivacy(true)}
                            checked={privacy}
                            />
                        Public
                    </label>
                    <label>
                        <input
                            type="radio"
                            onChange={() => setPrivacy(false)}
                            checked={!privacy}
                            />
                        Private
                    </label>
                </div>
                <div>
                    <span>{/* TODO: make asterisk red */}* Required fields</span>
                    <div>
                        <button type="cancel">Cancel</button>
                        <button type="submit" disabled={disabled}>Submit</button>
                    </div>
                </div>
                </>)}
            </form>
        </>
    );
}

export default CreateSet;