
const LOAD = 'allusers/LOAD'




const load = users => ({
    type: LOAD,
    users
})

export const getAllUsers = () => async dispatch => {
    const response = await fetch(`/api/allusers/`)
    if (response.ok) {
        const users = await response.json()

        dispatch(load(users))
    }
}

const initialState = {
    // list: []
}

const allUsersReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allUsers = {};
            if (action.users.users) {

                action.users.users.forEach(user => {
                    allUsers[user.id] = user
                });
            }
            return {
                ...allUsers,
                ...state,
            }
        }
        default:
            return state;
        }
    }

export default allUsersReducer
