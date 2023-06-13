import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { allComments, removeComment } from "../../store/comment";
import { authenticate } from "../../store/session";
import EditCommentModal from "./EditCommentModal";
import './CommentCards.css'

function CommentCards(comment) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allComments)
    }, [dispatch])

    console.log('This is comment', comment)

    // console.log("This is comment obj check for likes", comment)

    const currentUserId = useSelector((state) => state.session.user.id)
    const user = useSelector((state) => state.session.user)

    const deleteComment = async () => {
        await dispatch(removeComment(comment.id))
        alert('Comment Deleted')
    }

    // creates method to delete a like from comment
    const deleteCommentLike = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/users/${currentUserId}/commentlike`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        await response.json();
        dispatch(authenticate())
    }

    const addCommentLike = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/users/${currentUserId}/commentlike`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        await response.json();
        dispatch(authenticate())
    }


    if (!comment) return null
    return (
        <div className='comment-card'>
            {!user.profile_pic && (
                <i class="fa-regular fa-user"></i>
            )}
            <div className="comment-body">
                <h5>{comment.user.first_name} {comment.user.last_name}</h5>
                <p>{comment.comment_text}</p>
            </div>
            <div className="edit-delete">
                <div>
                    {currentUserId == comment.user.id && (
                        <EditCommentModal comment={comment} />
                    )}
                </div>
                <div>
                    {currentUserId == comment.user.id && (
                        <button onClick={deleteComment} id='delete-comment'>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}


export default CommentCards
