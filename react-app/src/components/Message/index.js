import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMessages, createOneMessage } from "../../store/message";
import { getChannels } from "../../store/channel";
import "./Message.css"

function Message () {

    const params = useParams()
    const {userId, friendId, channelId} = params

    const [content, setContent] = useState('')

    const channels = useSelector(state => state.channels)
    const messages = useSelector(state => Object.values(state.messages))
    const sessionUser = useSelector(state => state.session?.user)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getChannels(sessionUser?.id))
        dispatch(getMessages(userId, friendId))

    }, [dispatch, friendId])

    const createMessage = (e) => {
        e.preventDefault()
        const payload = {
            content,
            userId,
            friendId,
            userAvatar: sessionUser?.avatar,
            channelId : channels[channelId].id
        }
        dispatch(createOneMessage(payload))
        setContent('')
    }


    return (

        <div className="messages-container">

            <h3>{channels[channelId]?.friendUsername}</h3>

            <div className="messages-in-messages-container">
                {!!messages.length ? messages.map((message) => (
                    <div className="message-in-messages">

                        <div className="time-stamp-div">{message?.createdAt}</div>

                        <div className="content-avatar-in-message-div">
                            <div>{message?.content}</div>
                            <img className="messenger-avatar" alt="" src={message?.userAvatar}></img>
                        </div>

                    </div>
                )) : "no messages"}
            </div>

            <form className="submit-message-form" onSubmit={createMessage}>
                <input className="message-input" type="text" placeholder="send message..." value={content} onChange={(e) => setContent(e.target.value)}></input>
                <button className="message-send-button" type="submit">Send</button>
            </form>

        </div>

    )
}

export default Message;
