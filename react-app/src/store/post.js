
const CREATE = 'posts/CREATE'
const ALL = 'posts/ALL'
const USER = 'posts/USER'
const UPDATE = 'posts/UPDATE'
const DELETE = 'posts/DELETE'

const ADDPOSTLIKE = 'posts/ADDPOSTLIKE'
const DELETEPOSTLIKE = 'posts/DELETEPOSTLIKE'


const createPost = (post) => {
    return {
        type: CREATE,
        post
    }
}

const loadAllPosts = (posts) => {
    return {
        type: ALL,
        posts
    }
}

const loadUserPosts = (posts) => {
    return {
        type: USER,
        posts
    }
}

const updatePost = (post) => {
    return {
        type: UPDATE,
        post
    }
}

const deletePost = (postId) => {
    return {
        type: DELETE,
        postId
    }
}

const addPostLike = (postId, currentUserId) => {
    return {
        type: ADDPOSTLIKE,
        postId, 
        currentUserId
    }
}

const deletePostLike = (postId, currentUserId) => {
    return {
        type: DELETEPOSTLIKE,
        postId,
        currentUserId
    }
}

export const postCreate = (post) => async dispatch => {
    const response = await fetch(`/api/posts/new`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
      })
    //   console.log("This is inside thunk", post)

    if(response.ok){
        const newPost = await response.json()
        dispatch(createPost(newPost))
        return newPost
    }
}



export const userPosts = () => async dispatch => {
    const response = await fetch(`/api/posts/current`)

    if(response.ok){
        const posts = await response.json()
        dispatch(loadUserPosts(posts))
        return posts
    }
}

export const allPosts = () => async dispatch => {
    const response = await fetch(`/api/posts`)
    // console.log("This is in the all posts")
    if(response.ok){
        const posts = await response.json()
        dispatch(loadAllPosts(posts))
    }
}

export const postUpdate = (postId, post) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
      })

    if(response.ok){
        const updatedPost = await response.json()
        dispatch(updatePost(updatedPost))
        return updatedPost
    }
}

export const removePost = (postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
      })

    if(response.ok) {
        const post = await response.json()
        dispatch(deletePost(postId))
        return post
    }
}

export const postAddLike = (postId, currentUserId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/postlike`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(response.ok) {
        const post = await response.json()
        dispatch(addPostLike(postId, currentUserId))
        return post
    }
}

export const postDeleteLike = (postId, currentUserId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/postlike`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(response.ok) {
        const post = await response.json()
        dispatch(deletePostLike(postId, currentUserId))
        return post
    }
}

const initialState = { allPosts: {}, user: {} }

export default function reducer (state = initialState, action) {
    let newState;
    switch(action.type) {
        case CREATE:
            // console.log("IN REDUCER CREATE", action)
            newState = {...state, allPosts: {...state.allPosts}, user: {...state.user}}
            newState.user[action.post.id] = action.post
            newState.allPosts[action.post.id] = action.post
            return newState
        case ALL:
            newState = {...state, allPosts: {}, user: {...state.user}}
            action.posts.Posts.forEach(post => {
                newState.allPosts[post.id] = post
            });
            return newState
        case USER:
            newState = {...state, user: {...state.user}}
            action.posts.userPosts.forEach(post => {
                newState.user[post.id] = post
            });
            return newState
        case UPDATE:
            return {...state, allPosts: {...state.allPosts, [action.post.id]: action.post}}
        case DELETE:
            newState = {allPosts: {...state.allPosts}, user: {...state.user}}
            if(newState.user[action.postId]) delete newState.user[action.postId]
            if(newState.allPosts[action.postId]) delete newState.allPosts[action.postId]
            return newState
        case ADDPOSTLIKE:
            console.log("This is the addpost like intial state", state)
            return state
        case DELETEPOSTLIKE:
            // console.log("This is the delete post like intiial state", state)
            newState = {allPosts: {...state.allPosts}, user: {...state.user}}
            if(newState.allPosts[action.postId].post_likes.some(like => like.user === action.currentUserId)){
                const postLikes = newState.allPosts[action.postId].post_likes;
                const updatedPostLikes = postLikes.filter(like => like.user !== action.currentUserId)
                newState.allPosts[action.postId].post_likes = updatedPostLikes
                const userLikes = newState.allPosts[action.postId].user_likes;
                const updatedUserLikes = userLikes.filter(user => user !== action.currentUserId)
                newState.allPosts[action.postId].user_likes = updatedUserLikes
            }
            return newState
        default:
            return state
    }
}
