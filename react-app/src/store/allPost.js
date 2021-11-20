const LOAD = 'allPosts/LOAD'
// const ADD = 'posts/ADD'
// const DELETE = 'posts/DELETE'



const load = posts => ({
    type: LOAD,
    posts
})


export const getAllPosts = (userId) => async dispatch => {
    const response = await fetch(`/api/allposts/${userId}`)
    if (response.ok) {
        const posts = await response.json()

        dispatch(load(posts))
    }
}

const initialState = {
    // list: []
}

const allPostsReducer = (state = initialState, action) => {
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

export default allPostsReducer
