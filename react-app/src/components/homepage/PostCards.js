import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removePost, allPosts } from '../../store/post'
import { allComments } from '../../store/comment'
import EditPostModal from './EditPostModal'
import './PostCards.css'
import CommentCards from './CommentCards'
import CreateCommentForm from './CreateCommentForm'



function PostCards(post) {
    const dispatch = useDispatch()
    const deletePost = async () => {
        await dispatch(removePost(post.id))
        alert('Post Deleted')
    }

    const currentUser = useSelector((state) => state.session.user.id)
    const allComms = useSelector((state)=> state.comments.allComments)
    // console.log("This is current user", currentUser)
    // console.log("This is all comms", allComms)
    const comments = Object.values(allComms).reverse()
    // console.log("This is comments by time", comments)
    const postComments = comments.filter((comment) => Number(post.id) === Number(comment.post.id))
    // console.log("This is the post's comments", postComments)
    console.log("This is single post", post)


    useEffect(() => {
        dispatch(allPosts())
        dispatch(allComments())
    }, [dispatch])
    // const post = useSelector(state => state.posts)
    // console.log("This is single post", post)




    if (!post) return null
    return (
        <div className='post'>
            <div className='user-bar'>
                <div className='user'>
                    {!post.user.profile_pic && (
                        // <img src='../../../public/default_profile/default_user' />
                        <i class="fa-regular fa-user"></i>
                    )}
                    <h4 id='user-name'>
                        {post.user.first_name} {post.user.last_name}
                    </h4>
                </div>
                <div className='edit-delete'>
                    <div>{currentUser == post.user.id && (
                    <EditPostModal post={post} className='edit-delete-buttons'/>
                    )}
                    </div>

                    {currentUser == post.user.id && (
                        <button onClick={deletePost} className='edit-delete-buttons'>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    )}

                    {/* <div>Delete</div> */}
                </div>
            </div>
            <div className='post-content'>
                <p>{post.post}</p>
            </div>
            <div className='comments-likes'>
                <div className='cl-bar'>
                    <div onClick={()=>{alert('Coming soon!')}} id='likes-div'>
                    <i class="fa-regular fa-thumbs-up" ></i> Like
                    </div>
                    <div>
                    <i class="fa-regular fa-comment"></i> Comment
                    </div>
                </div>
                <div>
                    <CreateCommentForm post={post}/>
                </div>
                <div>
                    {postComments.map((comment)=> (
                        <CommentCards key={comment.id} {...comment}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostCards
