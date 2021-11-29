import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMessages, createOneMessage } from "../../store/message";
import { getChannels } from "../../store/channel";
import { useHistory } from "react-router";
import { deleteOneChannel } from "../../store/channel";
import { getYourMessages } from "../../store/yourMessage";
import "./Message.css"

function Message () {

    let history = useHistory()
    const params = useParams()
    const {userId, friendId } = params

    const [content, setContent] = useState('')

    // const channels = useSelector(state => state.channels)
    const channel = useSelector(state => Object.values(state.channels).find(channel => channel.friendId == friendId))
    const messages1 = useSelector(state => Object.values(state.messages))
    const messages2 = useSelector(state => Object.values(state.yourmessages))
    const messages = [...messages1, ...messages2]

    console.log(messages)
    const sessionUser = useSelector(state => state.session?.user)

    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = () => {
        setShowMenu(false);
    };

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getChannels(sessionUser?.id))
        dispatch(getMessages(userId, friendId))
        dispatch(getYourMessages(userId, friendId))

        if (!messages) return
        else messages.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
    }, [dispatch, friendId])

    const createMessage = (e) => {
        e.preventDefault()
        const payload = {
            content,
            userId,
            friendId,
            userAvatar: sessionUser?.avatar,
            channelId : channel?.id
        }
        dispatch(createOneMessage(payload))
        setContent('')
    }

    const convertTime = function(oldTime){
        console.log(oldTime)
        let newTime = oldTime.split(' ')[1]
        let time = newTime.split(':');
        let hours = time[0];
        let minutes = time[1];
        let timeValue = "" + ((hours >12) ? hours -12 :hours);
            timeValue += (minutes < 10) ? ':' + minutes : ":" + minutes;
            timeValue += (hours >= 12) ? " pm" : " am";
            // timeValue += "" + date
            return timeValue;
        }

    const isSameDay = function(oldTime) {
        // let today = Date.now().getDate().toString()
        let newToday = new Date().getDate().toString()
        let newOldTime = new Date(oldTime).getDate()
        console.log('todays date:', newToday)
        console.log('message date:', newOldTime)
        if (newToday == newOldTime){
            return true
        }
        return false
    }

    const deleteChannel = (e) => {
        e.preventDefault()
        dispatch(deleteOneChannel(userId, friendId, channel?.id))
        setShowMenu(false);
        history.push('/messages')
    }


    return (
        <div className="messages-component-container">

            <div className="upper-right-messages">
                <div className="flex">
                    <img className="channel-avatar" alt="" src={channel?.friendAvatar}></img>
                    <h3 className="channel-name">{channel?.friendUsername}</h3>

                </div>
                <div onClick={showMenu === false ? openMenu : closeMenu} className="delete-channel-icon">
                    <i class="i-icon fas fa-info"></i>
                </div>
                {showMenu && (
                    <div className="edit-my-post-dropdown">
                        <button onClick={deleteChannel}>delete chat</button>
                        <button>Cancel</button>
                    </div>
                )}
            </div>

            <div className="messages-container">

                <div className="messages-in-messages-container">
                    {!!messages.length ? messages.map((message) => (
                        <div className="message-in-messages">
                            <div>
                                {isSameDay(message?.createdAt)
                                ?
                                <div className="time-time-messages-div">
                                    {convertTime(message?.createdAt)}
                                </div>
                                :
                                <div className="time-stamp-messages-div">
                                    {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(message?.createdAt))} {new Date(message?.createdAt).getDate()}, 2021 {convertTime(message?.createdAt)}

                                </div>
                                }


                            </div>

                            {message.userId === sessionUser?.id ?
                                <div className="content-avatar-in-message-div">
                                    <div className="message-content">{message?.content}</div>
                                    <img className="messenger-avatar" alt="" src={message?.userAvatar}></img>
                                </div>

                                :
                                <div className="content-friend-in-message-div">
                                        <img className="messenger-avatar" alt="" src={message?.userAvatar}></img>
                                        <div className="message-content">{message?.content}</div>
                                </div>

                            }

                        </div>
                    )) : ""}
                </div>
            </div>

                <form className="submit-message-form" onSubmit={createMessage}>
                    <input className="message-input" type="text" placeholder="send message..." value={content} onChange={(e) => setContent(e.target.value)}></input>
                    <button className={content ? "blue-message-send-button" : "message-send-button"} type="submit">Send</button>
                </form>

        </div>

    )
}

export default Message;
