const ADD = 'hash/ADD'


const addHash = hash => ({
    type: ADD,
    hash
})


export const createOneHashtag = (name) => async dispatch => {
    const response = await fetch(`/api/hash/`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({...name})
      })
    if (response.ok) {
        const hash = await response.json()
        dispatch(addHash(hash))
    }
}

const initialState = {
    // list: []
}

const hashReducer = (state = initialState, action) => {
    switch(action.type) {
        // case LOAD: {
        //     const allLikes = {};
        //     action.likes.likes.forEach(likes => {
        //         allLikes[likes.id] = likes
        //     });
        //     return {
        //         ...allLikes,
        //     }
        // }
        case ADD: {
            const newState = {
                ...state,
                [action.hash.hash.id]: action.hash.hash
            }
            return newState;
        }
        default:
            return state;
        }
    }

export default hashReducer
