import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removePost } from '../../store/post'
import './PostCards.css'



function PostCards(post){
    const dispatch = useDispatch()
    // const removePost = async () => {
    //     await dispatch(removePost(post.id))
    //     alert('Post Deleted')
    // }

    const currentUser = useSelector((state)=>state.session.user.id)
    // console.log("This is current user", currentUser)




    useEffect(()=> {})
    // const post = useSelector(state => state.posts)
    // console.log("This is single post", post)
    if(!post) return null
    return (
        <div className='post'>
            <div className='user-bar'>
                <div className='user'>
              <p>
              {post.user.first_name} {post.user.last_name}
              </p>
                </div>
                <div>
                    <div>Edit</div>
                    {currentUser == post.user.id && (
                        <button onClick={removePost}>Delete</button>
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
