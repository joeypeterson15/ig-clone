const LOAD = 'allfollows/LOAD'


const loadFollows = follows => ({
    type: LOAD,
    follows
})



export const getAllFollows = () => async dispatch => {
    const response = await fetch(`/api/allfollows/`)
    if (response.ok) {
        const follows = await response.json()
        dispatch(loadFollows(follows))
    }
}


const initialState = {
    // list: []
}

const allFollowsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allFollows = {};
            action.follows.follows.forEach(follow => {
                allFollows[follow.id] = follow
            });
            return {
                ...allFollows,
                // ...state
            }
        }
        default:
            return state;
        }
    }

export default allFollowsReducer
