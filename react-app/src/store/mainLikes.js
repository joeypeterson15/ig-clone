
const LOAD = 'mainlikes/LOAD'
const ADD = 'mainlikes/ADD'
const DELETE = 'mainlikes/DELETE'

const loadLikes = likes => ({
    type: LOAD,
    likes
})

const addLike = like => ({
    type: ADD,
    like
})


const removeOneLike = id => ({
    type: DELETE,
    id
})






export const getMainLikes = (postId) => async dispatch => {
    const response = await fetch(`/api/likes/${postId}`)
    if (response.ok) {
        const likes = await response.json()
        dispatch(loadLikes(likes))
    }
}

export const createOneMainLike = (payload) => async dispatch => {
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

export const deleteOneMainLike = (userId, postId) => async dispatch => {
    const response = await fetch(`/api/likes/delete/${userId}/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type' : 'application/json',
        },

      })
      if (response.ok) {
          const id = await response.json()
          dispatch(removeOneLike(id))
      }

}





const initialState = {
    // list: []
}

const mainLikesReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allLikes = {};
            action.likes.likes.forEach(likes => {
                allLikes[likes.id] = likes
            });
            return {
                ...allLikes,
                ...state
            }
        }
        case ADD: {
            const newState = {
                ...state,
                [action.like.like.id]: action.like.like
            }
            return newState;
        }
        case DELETE: {
            const newState = {...state}
            delete newState[action.id.id]
            return newState;
        }
        default:
            return state;
        }
    }

export default mainLikesReducer
