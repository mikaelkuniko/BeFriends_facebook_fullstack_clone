import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as commentActions from '../../store/comment'
import './CreateCommentForm.css'

function CreateCommentForm({ post }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    // const userId = user.id;
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([])
    // const history = useHistory()
    // console.log('This is current post', post)

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
            post_id: post.id
            // user_id: userId
        };
        // console.log("This is the comment payload", payload)
        //  console.log('This is the payload', payload)

        return dispatch(commentActions.commentCreate(payload))
        .then(()=>setContent(''));

    };

    return (
        <div className="create-comment-div">
            <div>
               {!user.profile_pic && (
                <i class="fa-regular fa-user"></i>
               )}
            </div>
            <div>
                <form onSubmit={handleSubmit} className="create-comment">
                    <input
                        type="text"
                        value={content}
                        placeholder="Write a comment..."
                        onChange={e => setContent(e.target.value)}
                        className='input'
                    />
                    <button type="submit" id="comment-button" disabled={!!errors.length}><i class="fa-regular fa-comment" id='comment'></i></button>
                </form>
            </div>
        </div>
    );
}

export default CreateCommentForm;
