import Search from "../Search";
import { getChannels } from "../../store/channel"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Channel.css"

function Channel () {

    const sessionUser = useSelector(state => state.session?.user)
    const channels = useSelector(state => Object.values(state.channels))
    // const [showMessages, setShowMessages] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChannels(sessionUser?.id))
  }, [dispatch])



    return (
        <div className="channel-outer-div">
            <div className="channel-and-search-left-container">
                <Search />
                <div className="channels-div">
                    {channels ? channels.map((channel) => (
                        <Link to={`/messages/${channel?.userId}/${channel?.friendId}/${channel?.id}`} className="channel-in-channel-container">
                            <img className="avatar-div-channel-container" alt="" src={channel?.friendAvatar}></img>
                            <div>{channel?.friendUsername}</div>
                        </Link>
                    ))
                :
                        <div>You don't have any direct messages</div>
                }
                </div>
            </div>
        </div>
    )
}

export default Channel
