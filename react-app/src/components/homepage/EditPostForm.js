import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as postActions from '../../store/post'
import './PostFormModal.css';

function EditPostForm({post, onModalClose}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    // console.log("this is user", user)
    // const session = useSelector(state => state)
    // console.log('this is session', session)
    const userId = user.id;
    const [content, setContent] = useState(post.post.post);
    const history = useHistory()
    // console.log('this is post', post.post.post)

    // console.log("This is post in the post form", post.post.post)
    const postId = post.post.id
    // console.log('This postId', postId)

    // console.log('---------------this is post content----------------', post)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            post_text: content,
            // user_id: userId
         };
        //  console.log('This is the payload', payload)

        return dispatch(postActions.postUpdate(postId, payload))
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
        placeholder={`What's on your mind, ${user.first_name}?`}
        id="text-area"
        value={content}
        onChange={e => setContent(e.target.value)} />
        <button type="submit" id="edit-button">Edit</button>
        </form>
    );
}

export default EditPostForm;
