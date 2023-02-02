import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removePost, allPosts } from '../../store/post'
import { allComments } from '../../store/comment'
import EditPostModal from './EditPostModal'
import './PostCards.css'



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
                    <p>
                        {post.user.first_name} {post.user.last_name}
                    </p>
                </div>
                <div>
                    <div>{currentUser == post.user.id && (
                    <EditPostModal post={post}/>
                    )}
                    </div>

                    {currentUser == post.user.id && (
                        <button onClick={deletePost}>
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
                Comments and likes go here
            </div>
        </div>
    )
}

export default PostCards
