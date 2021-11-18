const LOAD = 'mainposts/LOAD'




const load = posts => ({
    type: LOAD,
    posts
})



export const getMainFeedPosts = (userId) => async dispatch => {
    const response = await fetch(`/api/main/${userId}`)
    if (response.ok) {
        const posts = await response.json()

        dispatch(load(posts))
    }
}




const initialState = {
    // list: []
}

const mainFeedPostsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allPosts = {};
            action.posts.posts.forEach(post => {
                allPosts[post.id] = post
            });
            return {
                ...allPosts,
                ...state,
            }
        }
        default:
            return state;
        }
    }

export default mainFeedPostsReducer
