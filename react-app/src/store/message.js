const LOAD = 'messages/LOAD'
const ADD = 'messages/ADD'




const load = messages => ({
    type: LOAD,
    messages
})

const createMessage = message => ({
    type: ADD,
    message
})




export const getMessages = (userId, friendId) => async dispatch => {
    const response = await fetch(`/api/messages/${userId}/${friendId}`)
    if (response.ok) {
        const messages = await response.json()

        dispatch(load(messages))
    }
}

export const createOneMessage = (payload) => async dispatch => {
    const response = await fetch(`/api/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({...payload})
      })
    if (response.ok) {
        const message = await response.json()
        dispatch(createMessage(message))
    }
}



const initialState = {
    // list: []
}

const messageReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allMessages = {};
            action.messages.messages.forEach(message => {
                allMessages[message.id] = message
            });
            return {
                ...allMessages,
                // ...state,
            }
        }
        case ADD: {
            const newState = {
                ...state,
                [action.message.id]: action.message
            }
            return newState;
        }
        default:
            return state;
        }
    }

export default messageReducer
