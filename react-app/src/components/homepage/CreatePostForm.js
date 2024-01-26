import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as postActions from '../../store/post'
import './CreatePostForm.css';


function CreatePostForm({ post, onModalClose }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userId = user.id;
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([])
    const history = useHistory()

    useEffect(() => {
        const errors = []
        if (content.length === 0) errors.push("Post must contain at least one character.")
        if (content.length > 2000) errors.push("Post must have less than 2000 characters.")
        setErrors(errors)
    }, [content])

    useEffect(() => {

    }, [errors])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            post_text: content,
            // user_id: userId
        };
        //  console.log('This is the payload', payload)

        return dispatch(postActions.postCreate(payload))
            // .then(()=>history.push('/homepage'));
            .then(onModalClose())

    };

    return (
        <form onSubmit={handleSubmit} className="create_post">
            <h2 id='create-post-header'>Create Post</h2>
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
                placeholder={`What's on your mind, ${user.first_name}?`}
                id="text-area"
                value={content}
                rows={7}
                cols={55}
                className='fixed-form-input'
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
            <button type="submit" id="post-button" disabled={!!errors.length}>Post</button>
        </form>
    );
}

export default CreatePostForm;
