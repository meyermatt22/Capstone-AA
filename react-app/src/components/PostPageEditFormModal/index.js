import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPostThunk, getOnePostThunk } from "../../store/posts";

function PostPageEditFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    // const goHere = id

    // console.log(id)

    useEffect(() => {
        dispatch(getOnePostThunk(id))
    }, [dispatch, id]);

    const post = useSelector(state => state.posts)
    console.log('post inside edit page ==> ', (post[id]))

    const [textContent, setTextContent] = useState('');
    

    useEffect(() => {
        if(post[id]) {
            setTextContent(post[id].textContent)

        }
    }, [post[id]]);

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('in the handle submit ==> ')

        setHasSubmitted(true);
        if(validationErrors.length) return alert('Your Post has errors, cannot submit!');

        const formData = new FormData();
        formData.append('text_content', textContent);


        const updatedPost = await dispatch(editPostThunk(formData, id));

        setTextContent(post.textContent);

        setValidationErrors([]);
        setHasSubmitted(false);

        history.push(`/posts/${id}`);
    };

    useEffect(() => {
        const errors = [];

        if (!textContent) errors.push('Please provide something!')
        setValidationErrors(errors)
    }, [ textContent ]);

    if(!post) {
        return <h1>hello</h1>
    };

    return (
        <div id="editPostForm">
            <h1>Edit Your Post!</h1>
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
            <form
                onSubmit={(e) => handleSubmit(e)}
                encType="multipart/form-data"
                id="editPostForm"
            >
                <div className="form-input-box text-input">
                    <div><label for="name">share here:</label></div>
                    <input
                        type="textArea"
                        name="textContent"
                        onChange={(e) => setTextContent(e.target.value)}
                        value={textContent}
                        required={true}
                        >
                    </input>
                </div>
                <div className="four">
                    <button className="confirm-submit" type="submit">Edit Post</button>
                </div>
            </form>
        </div>
    )
}

export default PostPageEditFormModal;
