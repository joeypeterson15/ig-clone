const LOAD = 'userPosts/LOAD'



const load = posts => ({
    type: LOAD,
    posts
})


export const getUserPosts = (userId) => async dispatch => {
    const response = await fetch(`/api/userposts/${userId}`)
    if (response.ok) {
        const posts = await response.json()

        dispatch(load(posts))
    }
}

const initialState = {
    // list: []
}

const userPostsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allPosts = {};
            action.posts.posts.forEach(post => {
                allPosts[post.id] = post
            });
            return {
                ...allPosts,
                // ...state,
            }
        }
        default:
            return state;
        }
    }

export default userPostsReducer
