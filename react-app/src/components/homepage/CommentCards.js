import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { allComments, removeComment } from "../../store/comment";
import EditCommentModal from "./EditCommentModal";
import './CommentCards.css'

function CommentCards(comment){
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(allComments)
    }, [dispatch])

    // console.log('This is comment', comment)

    const currentUserId = useSelector((state) => state.session.user.id)

    const deleteComment = async () => {
        await dispatch(removeComment(comment.id))
        alert('Comment Deleted')
    }


    if (!comment) return null
    return (
        <div className='comment-card'>
            <div className="comment">
                <p>prof img</p>
                <p>{comment.user.first_name} {comment.user.last_name}</p>
                <p>{comment.comment_text}</p>
            </div>
            <div>
            {currentUserId == comment.user.id && (
                    <EditCommentModal comment={comment}/>
                    )}
            </div>
            <div>
                {currentUserId == comment.user.id && (
                        <button onClick={deleteComment}>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    )}
                    </div>
        </div>
    )
}


export default CommentCards
