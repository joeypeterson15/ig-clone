const LOAD = 'likes/LOAD'
const ADD = 'likes/ADD'

const loadLikes = likes => ({
    type: LOAD,
    likes
})

const addLike = like => ({
    type: ADD,
    like
})

export const getLikes = (postId) => async dispatch => {
    const response = await fetch(`/api/likes/${postId}`)
    if (response.ok) {
        const likes = await response.json()
        dispatch(loadLikes(likes))
    }
}

export const createOneLike = (payload) => async dispatch => {
    const response = await fetch(`/api/likes/`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({...payload})
      })
    if (response.ok) {
        const like = await response.json()
        dispatch(addLike(like))
    }
}


const initialState = {
    // list: []
}

const likesReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allLikes = {};
            action.likes.likes.forEach(likes => {
                allLikes[likes.id] = likes
            });
            return {
                ...allLikes,
            }
        }
        case ADD: {
            const newState = {
                ...state,
                [action.like.like.id]: action.like.like
            }
            return newState;
        }
        default:
            return state;
        }
    }

export default likesReducer
