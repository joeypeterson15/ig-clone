

const LOAD = 'posts/LOAD'
const ADD = 'posts/ADD'
const DELETE = 'posts/DELETE'
const LOAD_AFTER_UPDATE = 'posts/LOAD_AFTER_UPDATE'



const load = posts => ({
    type: LOAD,
    posts
})

const createPost = post => ({
    type: ADD,
    post
})

const removeOnePost = postId => ({
    type: DELETE,
    postId
})

const loadAfterUpdate = (postId, post) => ({
    type: LOAD_AFTER_UPDATE,
    postId,
    post
})


export const getMyPosts = (userId) => async dispatch => {
    const response = await fetch(`/api/posts/${userId}`)
    if (response.ok) {
        const posts = await response.json()

        dispatch(load(posts))
    }
}


export const createOnePost = (payload, hashArray) => async dispatch => {
    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({...payload})
      })

    if (response.ok) {
        const post = await response.json()

        if(!!hashArray) {

            for (let i = 0; i < hashArray.length; i++) {
                await fetch(`/api/hashtags/${hashArray[i]}/${post.id}`, {
                method: 'POST',
                headers: {
                  'Content-Type' : 'application/json',
                },
                // body: JSON.stringify({...name})
              })
            }
        }
        dispatch(createPost(post))
    }
}
// export const createOnePost = (payload) => async dispatch => {
//     const response = await fetch(`/api/posts/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type' : 'application/json',
//         },
//         body: JSON.stringify({...payload})
//       })
//     if (response.ok) {
//         const post = await response.json()
//         dispatch(createPost(post))
//     }
// }

export const deleteOnePost = (postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type' : 'application/json',
        },

      })
      if (response.ok) {
          const postId = await response.json()
          dispatch(removeOnePost(postId))
      }

}


export const updateOnePost = (payload, postId, hashArray) => async dispatch => {
    const response = await fetch(`/api/posts/update/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(payload)
    })
        if (response.ok) {
            const { postId, post } = await response.json()

            if(!!hashArray) {

                for (let i = 0; i < hashArray.length; i++) {
                    await fetch(`/api/hashtags/${hashArray[i]}/${post.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    // body: JSON.stringify({...name})
                    })
                }
            }
            dispatch(loadAfterUpdate(postId, post))

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
        case DELETE: {
            const newState = {...state}
            delete newState[action.postId.postId]
            return newState;
        }
        case LOAD_AFTER_UPDATE: {
            const newState = { ...state}
            delete newState[action.postId]
            newState[action.postId] = action.post
            return newState;
        }
        default:
            return state;
        }
    }

export default myPostsReducer
