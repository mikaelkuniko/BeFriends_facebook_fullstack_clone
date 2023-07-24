import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removePost, allPosts } from '../../store/post'
import { authenticate } from '../../store/session'
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
    const currUserObj = useSelector((state) => state.session.user)
    const allComms = useSelector((state) => state.comments.allComments)
    // console.log("This is current user", currentUser)
    // console.log("This is all comms", allComms)
    const comments = Object.values(allComms).reverse()
    // console.log("This is comments by time", comments)
    const postComments = comments.filter((comment) => Number(post.id) === Number(comment.post.id))
    // console.log("This is the post's comments", postComments)
    // console.log("This is single post", post)
    // console.log("This is post", post)
    console.log("This is current user", currUserObj)


    // creates method to delete a like from post
    const deletePostLike = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/posts/${post.id}/postlike`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        await response.json();
        dispatch(authenticate())
    }

    // const addPostLike = async (e) => {
    //     e.preventDefault();
    //     const response = await fetch(`/api/users/${currentUser}/postlike`, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     await response.json();
    //     dispatch(authenticate())
    // }


    const addPostLike = async (e) => {
        // e.preventDefault();
        const response = await fetch(`/api/posts/${post.id}/postlike`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        await response.json();
        dispatch(authenticate())
    }

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
                        <EditPostModal post={post} className='edit-delete-buttons' />
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
            <div className='reactions'>
                {post.post_user_like > 0 && (<p>{post.post_user_like} likes</p>)}
            </div>
            <div className='comments-likes'>
                <div className='cl-bar'>
                    {/* if user has liked post show liked icon and clicking will remove the previous like */}
                    {/* <div onClick={() => { alert('Coming soon!') }} id='likes-div'>
                        <i class="fa-regular fa-thumbs-up" ></i> Like
                    </div> */}
                     <div onClick={addPostLike} id='likes-div'>
                        <i class="fa-regular fa-thumbs-up" ></i> Like
                    </div>
                    <div onClick={deletePostLike}> delete like </div>
                    <div>
                        <i class="fa-regular fa-comment"></i> Comment
                    </div>
                </div>
                <div>
                    <CreateCommentForm post={post} />
                </div>
                <div>
                    {postComments.map((comment) => (
                        <CommentCards key={comment.id} {...comment} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostCards
