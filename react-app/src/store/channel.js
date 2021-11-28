const LOAD = 'channels/LOAD'
const ADD = 'channels/ADD'
const DELETE = 'channels/DELETE'


const loadChannels = channels => ({
    type: LOAD,
    channels
})

const addChannel = channel => ({
    type: ADD,
    channel
})

const removeOneChannel = channelId => ({
    type: DELETE,
    channelId
})

export const getChannels = (userId) => async dispatch => {
    const response = await fetch(`/api/channels/${userId}`)

    if (response.ok) {
        const channels = await response.json()
        dispatch(loadChannels(channels))
    }
}

export const createOneChannel = (payload) => async dispatch => {
    const response = await fetch(`/api/channels/`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({...payload})
    })

    if (response.ok) {

        const channel = await response.json()
        dispatch(addChannel(channel))
    }
}

export const deleteOneChannel = (userId, friendId, channelId) => async dispatch => {
    const response = await fetch(`/api/channels/delete/${channelId}`, {
        method: 'DELETE',
        // headers: {
        //   'Content-Type' : 'application/json',
        // },

      })
      if (response.ok) {
          const channelId = await response.json()
          dispatch(removeOneChannel(channelId))
      }

}

const initialState = {
    // list: []
}

const channelReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allChannels = {};


                action.channels.channels.forEach(channel => {
                    allChannels[channel.id] = channel
                });

            return {
                ...allChannels,
                ...state,
            }
        }

        case ADD: {
            const newState = {
                ...state,
                [action.channel.channel.id]: action.channel.channel
            }
            return newState;
        }

        case DELETE: {
            const newState = {...state}
            delete newState[action.channelId.channelId]
            return newState;
        }

        default:
            return state;
        }
    }

export default channelReducer
