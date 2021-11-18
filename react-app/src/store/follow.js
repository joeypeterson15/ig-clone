const LOAD = 'follows/LOAD'
const ADD = 'follows/ADD'
const DELETE = 'follows/DELETE'

const loadFollows = follows => ({
    type: LOAD,
    follows
})

const addFollow = follow => ({
    type: ADD,
    follow
})
const removeOneFollow = id => ({
    type: DELETE,
    id
})

export const getFollows = (userId) => async dispatch => {
    const response = await fetch(`/api/follows/${userId}`)
    if (response.ok) {
        const follows = await response.json()
        dispatch(loadFollows(follows))
    }
}


export const createOneFollow = (payload) => async dispatch => {
    const response = await fetch(`/api/follows/`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({...payload})
      })
    if (response.ok) {
        const follow = await response.json()
        dispatch(addFollow(follow))
    }
}

// export const deleteOneFollow = (id) => async dispatch => {
//     const response = await fetch(`/api/follows/delete/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type' : 'application/json',
//         },

//       })
//       if (response.ok) {
//           const id = await response.json()
//           dispatch(removeOneFollow(id))
//       }

// }
export const deleteOneFollow = (userId, followId) => async dispatch => {
    const response = await fetch(`/api/follows/delete/${userId}/${followId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type' : 'application/json',
        },

      })
      if (response.ok) {
          const id = await response.json()
          dispatch(removeOneFollow(id))
      }

}

const initialState = {
    // list: []
}

const followsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allFollows = {};
            action.follows.follows.forEach(follow => {
                allFollows[follow.id] = follow
            });
            return {
                ...allFollows,
            }
        }
        case ADD: {
            const newState = {
                ...state,
                [action.follow.follow.id]: action.follow.follow
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

export default followsReducer
