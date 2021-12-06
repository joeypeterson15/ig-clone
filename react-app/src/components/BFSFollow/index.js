
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
            <div className="recommended-username">{follow?.username}</div>
            <div className="recommended-follow-div">
                {isFollowed
                ?
                <div>check</div>
                :
                <button onClick={createFollow} className="follow-button">Follow</button>}
            </div>
        </div>
    )
}

export default BFSFollow;
