import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as postActions from '../../store/post'
import './PostFormModal.css';

function CreatePostForm({post}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userId = user.id;
    const [content, setContent] = useState("");
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            post_text: content,
            // user_id: userId
         };
        //  console.log('This is the payload', payload)

        return dispatch(postActions.postCreate(payload))
            // .then(()=>history.push('/homepage'));

    };

    return (
        <form onSubmit={handleSubmit} className="create_post">
        <div id="user-card">
            {user && <p>profile img</p>}
            <h4>{user && `${user.first_name} ${user.last_name}`}</h4>
        </div>
        <textarea
        name="new-post"
        placeholder={`What's on your mind, ${user.first_name}?`}
        id="text-area"
        value={content}
        onChange={e => setContent(e.target.value)} />
        <button type="submit" id="post-button">Post</button>
        </form>
    );
}

export default CreatePostForm;
