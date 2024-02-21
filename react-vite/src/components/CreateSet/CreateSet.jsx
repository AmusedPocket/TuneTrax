import { useState } from "react";
import { useDispatch } from "react-redux"
import { thunkAddAlbum } from "../../redux/album"
import { thunkAddPlaylist } from "../../redux/playlist"

function CreateSet() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [validation, setValidation] = useState({});
    const [currentPage, setCurrentPage] = useState("basic info");
    const [disabled, setDisabled] = useState(false);

    const [songs, setSongs] = useState([]);
    const [albumImg, setAlbumImg] = useState();
    const [title, setTitle] = useState();
    const [type, setType] = useState();
    const [releaseDate, setReleaseDate] = useState();
    const [genre, setGenre] = useState();
    const [description, setDescription] = useState();
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
            genre,
            release_date: releaseDate,
            songs,
        }
        const response = await dispatch("Album" == type ? 
                                    thunkAddAlbum(payload) : 
                                    thunkAddPlaylist(payload));

        // Unsuccessful Submission
        if (response.message === "Bad Request") { 
            setErrors({
                message: response.message,
                errors: {...response.errors}
            });
            setDisabled(false);
            return;
        }

        // Successful Submission
        navigate(`/groups/${response.id}`);
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
                            Album type 
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
                            Genre 
                            <select
                                type="select"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                >
                                <option value="None" defaultValue>None</option>
                                <option value="Electronic">Electronic</option>
                                <option value="Rock">Rock</option>
                                <option value="Pop">Pop</option>
                                <option value="Alternative">Alternative</option>
                                <option value="Hauntology">Hauntology</option>
                                <option value="Classical">Classical</option>
                                <option value="Indie">Indie</option>
                                <option value="Rap">Rap</option>
                                <option value="Country">Country</option>
                                <option value="Metal">Metal</option>
                            </select>
                        </label>
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