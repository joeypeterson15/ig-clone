const LOAD = 'user/LOAD'




const load = user => ({
    type: LOAD,
    user
})

export const getUser = (userId) => async dispatch => {
    const response = await fetch(`/api/postuser/${userId}`)
    if (response.ok) {
        const user = await response.json()

        dispatch(load(user))
    }
}

const initialState = {
    // list: []
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const user = {
                [action.user.user.id] : action.user.user
            };
            return {
                ...user,
            }
        }
        default:
            return state;
        }
    }

export default userReducer
