import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createProfThunk } from "../../store/profiles";
import './ProfPageForm.css'
import { BarLoader } from "react-spinners";

function ProfPageForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [bio, setBio] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [profPic, setProfPic] = useState("")
    const [backgroundPic, setBackgroundPic] = useState("");

    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)
        if(validationErrors.length) return alert('Your Profile has errors, cannot submit!')

        const formData = new FormData()
        formData.append('bio', bio)
        formData.append('date_of_birth', dateOfBirth)
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('middle_name', middleName)
        formData.append('prof_pic', profPic)
        formData.append('background_pic', backgroundPic)

        const newProf = await dispatch(createProfThunk(formData))

        setBio('')
        setDateOfBirth('')
        setFirstName('')
        setLastName('')
        setMiddleName('')
        setProfPic('')
        setBackgroundPic('')
        setValidationErrors([])
        setHasSubmitted(false)

        history.push(`/profiles/${newProf.id}`)
    }

    useEffect(() => {
        const errors = [];

        if (!bio) errors.push('Please tell us about yourself!')
        if (!dateOfBirth) errors.push('When were you born?')
        if (!firstName) errors.push('Please provide a first name!')
        if (!lastName) errors.push('Please provide a last name!')
        if (!middleName) errors.push('Please provide a middle name!')
        if (!profPic?.name?.endsWith('.jpg') && !profPic?.name?.endsWith('.pdf') && !profPic?.name?.endsWith('.jpeg') && !profPic?.name?.endsWith('.png') && !profPic?.name?.endsWith('.gif')) errors.push('Please provide a profile picture that ends with "pdf", "png", "jpg", "jpeg", or "gif"!')
        if (!backgroundPic?.name?.endsWith('.jpg') && !backgroundPic?.name?.endsWith('.pdf') && !backgroundPic?.name?.endsWith('.jpeg') && !backgroundPic?.name?.endsWith('.png') && !backgroundPic?.name?.endsWith('.gif')) errors.push('Please provide a background picture that ends with "pdf", "png", "jpg", "jpeg", or "gif"!')
        setValidationErrors(errors)
    }, [ bio, dateOfBirth, firstName, lastName, middleName, profPic, backgroundPic ])

  

    return (
        <div id="newProfWrap">

            <div id="newProfileForm">
                <h1>Create Your Profile!</h1>
                {hasSubmitted && validationErrors.length > 0 && (
                    <div>
                        <h2>The following errors were found:</h2>
                        <ul>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="loadingArea">
                    {hasSubmitted &&  validationErrors.length === 0 &&(
                        <BarLoader color="#3c6e71"  className="loadingBar" />
                    )}
                </div>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    encType="multipart/form-data"
                    id="newProfForm"
                >
                    <div className="form-input-box first-name-input">
                        <div><label for="name"></label></div>
                        <input
                            className="inBox"
                            placeholder="first name"
                            type="text"
                            name="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required={true}
                            maxLength={30}
                            >
                        </input>
                    </div>
                    <div className="form-input-box last-name-input">
                        <div><label for="name"></label></div>
                        <input
                            className="inBox"
                            placeholder="last name"
                            type="text"
                            name="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required={true}
                            maxLength={30}
                            >
                        </input>
                    </div>
                    <div className="form-input-box middle-name-input">
                        <div><label for="name"></label></div>
                        <input
                            className="inBox"
                            placeholder="middle name"
                            type="text"
                            name="middleName"
                            onChange={(e) => setMiddleName(e.target.value)}
                            value={middleName}
                            required={true}
                            maxLength={30}
                            >
                        </input>
                    </div>
                    <div className="form-input-box bio-input">
                        <div><label for="bio"></label></div>
                        <textarea
                            className="inBox1"
                            placeholder="biography"
                            type="textArea"
                            name="bio"
                            onChange={(e) => setBio(e.target.value)}
                            value={bio}
                            required={true}
                            maxLength={500}
                            >
                        </textarea>
                    </div>

                    <div className="form-input-box">
                        <div><label for="profPic"></label></div>
                        <input
                            className="inBox2"
                            type="file"
                            name="profPic"
                            accept="image/*"
                            onChange={(e) => setProfPic(e.target.files[0])}
                            required={true}
                            >
                        </input>
                    </div>
                    <div className="form-input-box">
                        <div><label for="backgroundPic"></label></div>
                        <input
                            className="inBox2"
                            type="file"
                            name="backgroundPic"
                            accept="image/*"
                            onChange={(e) => setBackgroundPic(e.target.files[0])}
                            required={true}
                            >
                        </input>
                    </div>
                    <div className="form-input-box">
                        <label for="birthday">Birthday:</label>
                        <input
                            type="date"
                            name="birthday"
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required={true}
                            max={new Date().toISOString().split("T")[0]}
                            >
                        </input>

                    </div>
                    <div className="submitBtn">
                        <button className="confirm-submit" type="submit">Create Profile</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default ProfPageForm;
