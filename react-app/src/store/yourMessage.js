const LOAD = 'yourmessages/LOAD'





const load = messages => ({
    type: LOAD,
    messages
})





export const getYourMessages = (userId, friendId) => async dispatch => {
    const response = await fetch(`/api/yourmessages/${userId}/${friendId}`)
    if (response.ok) {
        const messages = await response.json()

        dispatch(load(messages))
    }
}




const initialState = {
    // list: []
}

const yourMessageReducer = (state = initialState, action) => {
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
        default:
            return state;
        }
    }

export default yourMessageReducer
