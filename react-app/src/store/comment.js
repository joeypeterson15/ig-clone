const LOAD = 'comments/LOAD'
const ADD = 'comments/ADD'
const DELETE = 'comments/DELETE'
const LOAD_AFTER_UPDATE = 'comments/LOAD_AFTER_UPDATE'

const loadComments = comments => ({
    type: LOAD,
    comments
})

const addComment = comment => ({
    type: ADD,
    comment
})

const removeOneComment = commentId => ({
    type: DELETE,
    commentId
})

const loadAfterUpdate = (commentId, comment) => ({
    type: LOAD_AFTER_UPDATE,
    commentId,
    comment
})



export const getComments = (postId) => async dispatch => {
    const response = await fetch(`/api/comments/${postId}`)

    if (response.ok) {
        const comments = await response.json()
        dispatch(loadComments(comments))
    }
}

export const createOneComment = (payload) => async dispatch => {
    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({...payload})
    })

    if (response.ok) {
        console.log('response!!!', response)
        const comment = await response.json()
        dispatch(addComment(comment))
    }
}

export const deleteOneComment = (commentId) => async dispatch => {
    const response = await fetch(`/api/comments/delete/${commentId}`, {
        method: 'DELETE',
        // headers: {
        //   'Content-Type' : 'application/json',
        // },

      })
      if (response.ok) {
          const commentId = await response.json()
          dispatch(removeOneComment(commentId))
      }

}

export const updateOneComment = (payload, commentId) => async dispatch => {
    const response = await fetch(`/api/comments/update/${commentId}`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const { commentId, comment } = await response.json()
        dispatch(loadAfterUpdate(commentId, comment))
    }
}

const initialState = {
    // list: []
}

const commentsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allComments = {};
            action.comments.comments.forEach(comment => {
                allComments[comment.id] = comment
            });
            return {
                ...allComments,
                // ...state,
            }
        }
        case ADD: {
            const newState = {
                ...state,
                [action.comment.comment.id]: action.comment.comment
            }
            return newState;
        }
        case DELETE: {
            const newState = {...state}
            delete newState[action.commentId.commentId]
            return newState;
        }
        case LOAD_AFTER_UPDATE: {
            const newState = { ...state}
            delete newState[action.commentId]
            newState[action.commentId] = action.comment
            return newState;
        }
        default:
            return state;
        }
    }

export default commentsReducer
