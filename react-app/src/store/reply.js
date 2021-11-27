const LOAD = 'replies/LOAD'
const ADD = 'replies/ADD'



const loadComments = comments => ({
    type: LOAD,
    comments
})

const addComment = comment => ({
    type: ADD,
    comment
})





export const getReplies = (commentId) => async dispatch => {
    const response = await fetch(`/api/replies/${commentId}`)

    if (response.ok) {
        const comments = await response.json()
        dispatch(loadComments(comments))
    }
}

export const createOneReply = (payload) => async dispatch => {
    const response = await fetch(`/api/replies/`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({...payload})
    })

    if (response.ok) {
        const comment = await response.json()
        dispatch(addComment(comment))
    }
}



const initialState = {
    // list: []
}

const repliesReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allComments = {};
            action.comments.comments.forEach(comment => {
                allComments[comment.id] = comment
            });
            return {
                ...allComments,
                ...state,
            }
        }

        case ADD: {
            const newState = {
                ...state,
                [action.comment.comment.id]: action.comment.comment
            }
            return newState;
        }
        
        default:
            return state;
        }
    }

export default repliesReducer
