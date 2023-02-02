import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Redirect } from "react-router-dom";
import './index.css'
import * as sessionActions from '../../store/session'
import * as postActions from '../../store/post'
import PostCards from "./PostCards";
import CreatePostModal from "./CreatePostModal";

function Homepage(){

    const dispatch = useDispatch()
    const allPosts = useSelector(state => state.posts.allPosts)
    const posts = Object.values(allPosts).reverse()
    const user = useSelector(state=>state.session.user)
    // console.log("This is state", state)

    useEffect(()=> {
        dispatch(postActions.allPosts())
    }, [dispatch])

    if (!user) return <Redirect to="/" />
    if (posts.length === 0) return null;

    return (
        <div className="posts-div">
            <div className="post-modal">
                <div>Profile Image</div>
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

export default Homepage
