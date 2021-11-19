import Search from "../Search";
import { createOneChannel, getChannels } from "../../store/channel"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getMessages } from "../../store/message";
import "./Channel.css"

function Channel () {

    const sessionUser = useSelector(state => state.session?.user)
    const channels = useSelector(state => Object.values(state.channels))
    const messages = useSelector(state => state.messages)
    const [showMessages, setShowMessages] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChannels(sessionUser?.id))
  }, [dispatch])


//     useEffect(() => {
//         if (!showMessages) {
//             return
//         }
//         dispatch(getMessages(channel?.userId, channel?.friendId))
//   }, [dispatch, showMessages])

    const handleMessages = (channel) => () => {
        dispatch(getMessages(channel?.userId, channel?.friendId))
        setShowMessages(true)

    }



    return (
        <div className="channel-outer-div">
            <div className="channel-and-search-left-container">
                <Search />
                <div className="channels-div">
                    {channels ? channels.map((channel) => (
                        <div className="channel-in-channel-container" onClick={handleMessages(channel)}>
                            <img className="avatar-div-channel-container" alt="" src={channel?.friendAvatar}></img>
                            <div>{channel?.friendUsername}</div>
                        </div>
                    ))
                :
                        <div>You don't have any direct messages</div>
                }
                </div>
            </div>
            <div className="message-container">
                {!!messages.length && showMessages ? messages.map((message) => (
                    <div>{message?.content}</div>
                )) : "no messages"}

            </div>
        </div>
    )
}

export default Channel
