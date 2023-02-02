import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as commentActions from '../../store/comment'

function CreateCommentForm({ post }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    // const userId = user.id;
    const [content, setContent] = useState("");
    // const history = useHistory()
    // console.log('This is current post', post)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            comment_text: content,
            post_id: post.id
            // user_id: userId
        };
        console.log("This is the comment payload", payload)
        //  console.log('This is the payload', payload)

        return dispatch(commentActions.commentCreate(payload))
        .then(()=>setContent(''));

    };

    return (
        <div>
            <div>
                <p> profile image</p>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="create-comment">
                    <input
                        type="text"
                        value={content}
                        placeholder="Write a comment..."
                        onChange={e => setContent(e.target.value)}
                    />
                    <button type="submit" id="comment-button">Comment</button>
                </form>
            </div>
        </div>
    );
}

export default CreateCommentForm;
