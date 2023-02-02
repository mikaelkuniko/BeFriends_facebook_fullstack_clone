import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as commentActions from '../../store/comment'

function EditCommentForm({comment, onModalClose}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const userId = user.id;
    const [content, setContent] = useState(comment.comment.comment_text);
    const history = useHistory()

    console.log('This is comment', comment)

    const commentId = comment.comment.id

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
        <form onSubmit={handleSubmit} className="edit_post">
        <div id="user-card">
            {user && <p>profile img</p>}
            <h4>{user && `${user.first_name} ${user.last_name}`}</h4>
        </div>
        <textarea
        name="new-post"
        rows={8}
        cols={64}
        className='fixed-form-input'
        placeholder='Edit your comment...'
        id="text-area"
        value={content}
        onChange={e => setContent(e.target.value)} />
        <button type="submit" id="edit-button">Edit</button>
        </form>
    );
}

export default EditCommentForm;
