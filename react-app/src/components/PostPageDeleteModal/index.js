import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deletePostThunk } from "../../store/posts";
import './PostPageDeleteModal.css'

function PostDeleteModal({postId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault()

        const deletedPost = await dispatch(deletePostThunk(postId))

        // if (deletedPost.message === 'delete successful') {
        history.push("/home");
        closeModal();
        //   };
    }

    return (
        <div className="delete-post-div">
            <h1 className="modalText">Delete Your Post?</h1>
            <form onSubmit={handleDelete} id="subButtons">
                <button className="confirm-post-delete" type="submit">Yes, delete my post</button>
                <button className="decline-post-delete" onClick={closeModal} >No, keep my post</button>
            </form>
        </div>
    )
}

export default PostDeleteModal;
