
const LOAD = 'hashposts/LOAD'




const load = posts => ({
    type: LOAD,
    posts
})



export const getAllHashPosts = (name) => async dispatch => {
    const response = await fetch(`/api/hashposts/${name}`)
    if (response.ok) {
        const posts = await response.json()

        dispatch(load(posts))
    }
}



const initialState = {
    // list: []
}

const hashPostReducer = (state = initialState, action) => {
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

export default hashPostReducer
