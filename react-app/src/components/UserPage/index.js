import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Redirect } from "react-router-dom";
import './index.css'
import * as sessionActions from '../../store/session'
import * as postActions from '../../store/post'
import PostCards from "../homepage/PostCards";
import CreatePostModal from "../homepage/CreatePostModal"

function Userpage(){

    const dispatch = useDispatch()
    const userPosts = useSelector(state => state.posts.user)
    console.log("This is userPosts", userPosts)
    const posts = Object.values(userPosts).reverse()
    // this variable sets so that all posts are in chronological order
    const user = useSelector(state=>state.session.user)
    // console.log("This is state", state)
    // console.log("this is user", user)

    useEffect(()=> {
        dispatch(postActions.userPosts())
    }, [dispatch])

    if (!user) return <Redirect to="/" />
    if (posts.length === 0) return null;

    return (
        <div className="posts-div">
            <div className="post-modal">
                {!user.profile_pic && (
                        // <img src='../../../public/default_profile/default_user' />
                        <i class="fa-regular fa-user post-profile-pic"></i>
                    )}
                {user.profile_pic && (
                        <img src={user.profile_pic}/>
                    )}
                <div>
                <CreatePostModal user={user}/>
                </div>
            </div>
            <div>
                {posts.map((post)=> (
                    <PostCards key={post.id} {...post}/>
                ))}
            </div>
        </div>

    )
}

export default Userpage
