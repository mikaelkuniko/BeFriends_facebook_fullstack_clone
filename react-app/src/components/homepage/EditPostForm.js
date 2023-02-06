import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as postActions from '../../store/post'
import './EditPostForm.css';

function EditPostForm({ post, onModalClose }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    // console.log("this is user", user)
    // const session = useSelector(state => state)
    // console.log('this is session', session)
    const userId = user.id;
    const [content, setContent] = useState(post.post.post);
    const [errors, setErrors] = useState([])
    const history = useHistory()
    // console.log('this is post', post.post.post)

    // console.log("This is post in the post form", post.post.post)
    const postId = post.post.id
    // const originalPost = post.post.post
    // console.log('This postId', postId)

    // console.log('---------------this is post content----------------', post)

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

        return dispatch(postActions.postUpdate(postId, payload))
            .then(onModalClose())

    };

    return (
        <form onSubmit={handleSubmit} className="edit_post">
            <h2 id='edit-post-header'>Edit Post</h2>
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
                placeholder={`What's on your mind, ${user.first_name}?`}
                id="text-area"
                required
                value={content}
                onChange={e => setContent(e.target.value)} />
                {!!errors.length && (
                        <div className="edit-post-errors">
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

export default EditPostForm;
