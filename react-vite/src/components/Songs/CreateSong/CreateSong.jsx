import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkEditSong, thunkPostAlbumSong, thunkPostSong } from "../../../redux/song";

function CreateSong({ editedSong, songFile, dontNavigate=false }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [validation, setValidation] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const [songImg, setSongImg] = useState(editedSong ? editedSong.image : "No Image");
    const [title, setTitle] = useState(editedSong ? editedSong.title : "");
    const [description, setDescription] = useState(editedSong ? editedSong.body : "");
    const [genre, setGenre] = useState(editedSong ? editedSong.genre : "");
    const [privacy, setPrivacy] = useState(false);
    
    function onImageChange(e) {
        if (e.target.files && e.target.files[0]);
            setSongImg(URL.createObjectURL(e.target.files[0]));
    }

    async function onSubmit(e) {
        e.preventDefault();
        setDisabled(false);

        // Validations
        const tempValidation = {};
        if ("" == title) tempValidation.title = "Enter a title.";
        if ("" == description) tempValidation.title = "Enter a description.";
        if ("" == genre) tempValidation.title = "Pick a genre.";
        setValidation(tempValidation)

        // Unsuccessful Validation
        if (Object.values(tempValidation).length != 0) 
            return setDisabled(false);

        const payload = {
            title,
            song_pic: songImg,
            body: description,
            genre,
            visibility: privacy,
        }

        if (editedSong) payload.id = editedSong.id;
        else payload.song = songFile;

        let response;
        if (!dontNavigate) response = await dispatch(editedSong ? thunkEditSong(payload) : thunkPostSong(payload));
        else response = await dispatch(thunkPostAlbumSong(payload))
            
        // Unsuccessful Submission
        if (response.errors) { 
            setErrors(Object.keys(response.errors).reduce((acc, errKey) => 
                acc[errKey] = response.errors[errKey], {}));
            setDisabled(false);
            return;
        }

        // Successful Submission
        if (!dontNavigate) navigate(`/songs/${response.id}`);
        else setHasSubmitted(true);
    }

    return !hasSubmitted || !dontNavigate ? (
        <form onSubmit={onSubmit}>
            <div>
                <img src={songImg} alt="Song image."/>
                {songImg == "No Image" &&
                <input 
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    />
                }
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
                        Set Genre {/* TODO: make asterisk red */}*
                        <select
                            type="select"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            >
                            <option value="" defaultValue hidden>None</option>
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
        </form>
    ) : (
        <>
            <img src={songImg} alt={`${title} picture.`}/>
            <span>{title}</span>
            <span>{privacy ? "Public" : "Private"}</span>
        </>
    )
}

export default CreateSong;