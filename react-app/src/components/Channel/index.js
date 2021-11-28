import Search from "../Search";
import { getChannels } from "../../store/channel"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchModal from "../SearchModal";
import { useParams } from "react-router";
import "./Channel.css"

function Channel () {

    const sessionUser = useSelector(state => state.session?.user)
    const channels = useSelector(state => Object.values(state.channels))
    // const [showMessages, setShowMessages] = useState(false)
    const params = useParams()
    const {friendId} = params
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChannels(sessionUser?.id))
  }, [dispatch])



    return (
        <div className="channel-outer-div">
            <div className="channel-and-search-left-container">
                <div className="top-left-channel">
                    <div className="messages-bold-username">{sessionUser?.username}</div>
                    <SearchModal />
                </div>
                <div className="channels-div">
                    {channels ? channels.map((channel) => (
                        <Link to={`/messages/${channel?.userId}/${channel?.friendId}`} className={friendId == channel?.friendId ? "grey-in-channel-container" : "channel-in-channel-container"}>
                            <img className="avatar-div-channel-container" alt="" src={channel?.friendAvatar}></img>
                            <div className="channel-username">{channel?.friendUsername}</div>
                        </Link>
                    ))
                :
                        <div>You don't have any direct messages</div>
                }
                </div>
            </div>

            { !window.location.href.includes('messages/') ? <div className="right-side-container">
                <div className="center-right-container">

                    <div className="center-messages-icon">
                        <i className="messages-icon far fa-paper-plane"></i>
                    </div>
                    <h3 className="grey-text">Your Messages</h3>
                    <h5 className="grey-text">Send private messages to a friend</h5>
                    <button className="button-send-message">Send Message</button>

                </div>
            </div> : ''}
        </div>
    )
}

export default Channel
