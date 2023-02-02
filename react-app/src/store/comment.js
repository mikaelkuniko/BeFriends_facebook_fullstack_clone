
const CREATE = 'comments/CREATE'
const ALL = 'comments/ALL'
const USER = 'comments/USER'
const UPDATE = 'comments/UPDATE'
const DELETE = 'comments/DELETE'

const createComment = (comment) => {
    return {
        type: CREATE,
        comment
    }
}

const loadAllComments = (comments) => {
    return {
        type: ALL,
        comments
    }
}

const loadUserComments = (comments) => {
    return {
        type: USER,
        comments
    }
}

const updateComment = (comment) => {
    return {
        type: UPDATE,
        comment
    }
}

const deleteComment = (commentId) => {
    return {
        type: DELETE,
        commentId
    }
}

export const commentCreate = (comment) => async dispatch => {
    const response = await fetch(`/api/comments/new`, {
        method: 'comment',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment)
      })
    //   console.log("This is inside thunk", comment)

    if(response.ok){
        const newComment = await response.json()
        dispatch(createComment(newComment))
        return newComment
    }
}



export const userComments = () => async dispatch => {
    const response = await fetch(`/api/comments/current`)

    if(response.ok){
        const comments = await response.json()
        dispatch(loadUserComments(comments))
        return comments
    }
}

export const allComments = () => async dispatch => {
    const response = await fetch(`/api/comments`)
    console.log("This is in the all comments")
    if(response.ok){
        const comments = await response.json()
        dispatch(loadAllComments(comments))
    }
}

export const commentUpdate = (commentId, comment) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment)
      })

    if(response.ok){
        const updatedComment = await response.json()
        dispatch(updateComment(updatedComment))
        return updatedComment
    }
}

export const removeComment = (commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
      })

    if(response.ok) {
        const comment = await response.json()
        dispatch(deleteComment(commentId))
        return comment
    }
}

const initialState = { allComments: {}, user: {} }

export default function reducer (state = initialState, action) {
    let newState;
    switch(action.type) {
        case CREATE:
            // console.log("IN REDUCER CREATE", action)
            newState = {...state, allComments: {...state.allComments}, user: {...state.user}}
            newState.user[action.comment.id] = action.comment
            newState.allComments[action.comment.id] = action.comment
            return newState
        case ALL:
            newState = {...state, allComments: {}, user: {...state.user}}
            action.comments.Comments.forEach(comment => {
                newState.allComments[comment.id] = comment
            });
            return newState
        case USER:
            newState = {...state, user: {...state.user}}
            action.comments.userComments.forEach(comment => {
                newState.user[comment.id] = comment
            });
            return newState
        case UPDATE:
            return {...state, allComments: {...state.allComments, [action.comment.id]: action.comment}}
        case DELETE:
            newState = {allComments: {...state.allComments}, user: {...state.user}}
            if(newState.user[action.commentId]) delete newState.user[action.commentId]
            if(newState.allComments[action.commentId]) delete newState.allComments[action.commentId]
            return newState
        default:
            return state
    }
}
