import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as commentActions from '../../store/comment'
import './EditCommentForm.css'

function EditCommentForm({comment, onModalClose}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const userId = user.id;
    const [content, setContent] = useState(comment.comment.comment_text);
    const [errors, setErrors] = useState([])
    const history = useHistory()

    // console.log('This is comment', comment)

    const commentId = comment.comment.id

    useEffect(() => {
        const errors = []
        if (content.length === 0) errors.push("Post must contain at least one character.")

        setErrors(errors)
    }, [content])

    useEffect(() => {

    }, [errors])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            comment_text: content,
            post_id: comment.comment.post.id
            // user_id: userId
         };
        //  console.log('This is the payload', payload)

        return dispatch(commentActions.commentUpdate(commentId, payload))
                .then(onModalClose())

    };

    return (
        <form onSubmit={handleSubmit} className="edit_comment">
          <h2 id='edit-comment-header'>Edit Comment</h2>
         <div id="user-card">
                {user.profile_pic && <p>profile img</p>}
                {!user.profile_pic && (
                <div>
                    <i class="fa-regular fa-user"></i>
                    </div>)}
                <div id='name'>
                    <h4>{user && `${user.first_name} ${user.last_name}`}</h4>
                </div>
            </div>
        <textarea
        name="new-post"
        rows={7}
        cols={55}
        className='fixed-form-input'
        placeholder='Edit your comment...'
        id="text-area"
        value={content}
        onChange={e => setContent(e.target.value)} />
        {!!errors.length && (
                <div className="create-post-errors">
                    The following errors were found:
                    <ul className='errors'>
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        <button type="submit" id="edit-button" disabled={!!errors.length}>Edit</button>
        </form>
    );
}

export default EditCommentForm;
