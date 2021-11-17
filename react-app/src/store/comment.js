const LOAD = 'comments/LOAD'

const loadComments = comments => ({
    type: LOAD,
    comments
})

export const getComments = (postId) => async dispatch => {
    const response = await fetch(`/api/comments/${postId}`)

    if (response.ok) {
        const comments = await response.json()
        dispatch(loadComments(comments))
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
        default:
            return state;
        }
    }

export default commentsReducer
