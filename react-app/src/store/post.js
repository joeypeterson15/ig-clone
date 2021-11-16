const LOAD = 'posts/LOAD'
const ADD = 'posts/ADD'



const load = posts => ({
    type: LOAD,
    posts
})

const createPost = post => ({
    type: ADD,
    post
})


export const getMyPosts = (userId) => async dispatch => {
    const response = await fetch(`/api/posts/${userId}`)
    if (response.ok) {
        const posts = await response.json()

        dispatch(load(posts))
    }
}

export const createOnePost = (payload) => async dispatch => {
    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({...payload})
      })
    if (response.ok) {
        const post = await response.json()
        dispatch(createPost(post))
    }
}


const initialState = {
    // list: []
}

const myPostsReducer = (state = initialState, action) => {
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
        case ADD: {
            const newState = {
                ...state,
                [action.post.id]: action.post
            }
            return newState;
        }
        default:
            return state;
        }
    }

export default myPostsReducer
