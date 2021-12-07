
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import { createOneFollow } from '../../store/follow';

function BFSFollow ({follow}) {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.session?.user)
    const [isFollowed, setIsFollowed] = useState(false)



    const createFollow = (e) => {
        e.preventDefault()
        const payload = {
            userId : user?.id,
            followId : follow?.id
        }
        dispatch(createOneFollow(payload))
        setIsFollowed(true)
    }


    return (
        <div className="recommended-user-card">
            <div className="rec-avatar-username">
                <img className="avatar-rec" alt="" src={follow?.avatar}></img>
                <div className="user-plus-suggested-cont">
                    <div className="recommended-username">{follow?.username}</div>
                    <div className="grey-suggest-text">Suggested for you</div>
                </div>
            </div>
            <div className="recommended-follow-div">
                {isFollowed
                ?
                <div>Following</div>
                :
                <button onClick={createFollow} className="rec-follow-button">Follow</button>}
            </div>
        </div>
    )
}

export default BFSFollow;
