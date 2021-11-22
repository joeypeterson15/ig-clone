const LOAD = 'followers/LOAD'


const loadFollows = follows => ({
    type: LOAD,
    follows
})


export const getFollowers = (userId) => async dispatch => {
    const response = await fetch(`/api/followers/${userId}`)
    if (response.ok) {
        const follows = await response.json()
        dispatch(loadFollows(follows))
    }
}


const initialState = {
    // list: []
}

const followersReducer = (state = initialState, action) => {
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
        default:
            return state;
        }
    }

export default followersReducer
