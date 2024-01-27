import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removePost, allPosts, postUpdate,postAddLike, postDeleteLike } from '../../store/post'
import { authenticate } from '../../store/session'
import { allComments } from '../../store/comment'
import EditPostModal from './EditPostModal'
import './PostCards.css'
import CommentCards from './CommentCards'
import CreateCommentForm from './CreateCommentForm'



function PostCards(post) {
    const dispatch = useDispatch()
    const [localPost, setLocalPost] = useState(post)

    const deletePost = async () => {
        await dispatch(removePost(post.id))
        alert('Post Deleted')
    }



    const currentUser = useSelector((state) => state.session.user.id)
    const currUserObj = useSelector((state) => state.session.user)
    const allComms = useSelector((state) => state.comments.allComments)

    // ask how state works (it grabs current state? how does this factor in with rendering)

    // console.log("This is current user", currentUser)
    // console.log("This is all comms", allComms)
    const comments = Object.values(allComms).reverse()
    // console.log("This is comments by time", comments)
    const postComments = comments.filter((comment) => Number(post.id) === Number(comment.post.id))
    // console.log("This is the post's comments", postComments)
    // console.log("This is single post", post)
    // console.log("This is post", post)
    // console.log("this is the user_id of those who liked the post", post.user_likes)
    const userLikedPost = post.user_likes.includes(currentUser)
    // console.log("Did current user like the post", userLikedPost)
    // console.log("This is current user", currUserObj)


    // creates method to delete a like from post
    const deletePostLike = async (e) => {
        e.preventDefault();
        // preventdefault prevents infinite loading of the page
        const response = await fetch(`/api/posts/${post.id}/postlike`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        await response.json();
        console.log("this is the local state of post prior to delete", localPost)
        const updatedLikes = localPost.post_likes.filter(userId => userId !== currentUser)
        const updatedUserLikes = localPost.user_likes.filter(userId => userId !== currentUser)
        setLocalPost({
            ...localPost,
            post_likes: updatedLikes,
            user_likes: updatedUserLikes
        });
        console.log("this is the local state of post after like delete", localPost)
        dispatch(authenticate())
    }

    const deletePostLike2 = async () => {
        console.log("This is current user", currentUser)
        await dispatch(postDeleteLike(post.id, currentUser))
        // alert('Post Deleted')
    }

    const addPostLike2 = async () => {
        await dispatch(postAddLike(post.id, currentUser))
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
        e.preventDefault();
        const response = await fetch(`/api/posts/${post.id}/postlike`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const newLike = await response.json();
        console.log("this is local state of post prior to like", localPost)
        const updatedLikes = [...localPost.post_likes, newLike]
        const updatedUserLikes = [...localPost.user_likes, currentUser]
        setLocalPost({
            ...localPost,
            post_likes: updatedLikes,
            user_likes: updatedUserLikes
        })
        console.log("this is local state of post after to like", localPost)
        dispatch(authenticate())
    }

    useEffect(() => {
        dispatch(allPosts())
        dispatch(allComments())
    }, [dispatch])
    // const post = useSelector(state => state.posts)
    // console.log("This is single post", post)

    useEffect(() => {
        setLocalPost(post);
    }, [post])


    if (!post) return null
    // this if statement checks to ensure site doesnt crash
    return (
        <div className='post'>
            <div className='user-bar'>
                <div className='user'>
                    {!post.user.profile_pic && (
                        // create profile picture and connect to aws
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
                {post.post_likes.length > 0 && (<p>{post.post_likes.length} likes</p>)}
                {/* create method in the join table reflects users id so you can query through and grab the names */}
            </div>
            <div className='comments-likes'>
                <div className='cl-bar'>
                    {/* <div onClick={() => { alert('Coming soon!') }} id='likes-div'>
                        <i class="fa-regular fa-thumbs-up" ></i> Like
                    </div> */}
                    {!userLikedPost && (<div onClick={addPostLike2} id='likes-div'>
                        <i class="fa-regular fa-thumbs-up" ></i> Like
                    </div>)}
                    {userLikedPost && (<div onClick={deletePostLike2}> 
                    <i class="fa-solid fa-thumbs-up" ></i> Like </div>)}
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
