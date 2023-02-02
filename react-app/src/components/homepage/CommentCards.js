import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { allComments } from "../../store/comment";

function CommentCards(comment){
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(allComments)
    }, [dispatch])

    console.log('This is comment', comment)

    if (!comment) return null
    return (
        <div className='comment-card'>
            <p>prof img</p>
            <div className="comment">
                <p>{comment.user.first_name} {comment.user.last_name}</p>
                <p>{comment.comment_text}</p>
            </div>
            <div>Edit</div>
            <div>Delete</div>
        </div>
    )
}


export default CommentCards
