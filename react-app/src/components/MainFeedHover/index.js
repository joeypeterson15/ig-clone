import { getUser } from "../../store/user"
import { useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function MainFeedHover ({post}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user[0])

    useEffect(() => {
        dispatch(getUser(post?.userId))
    }, [dispatch])

    return (
        <div className="hover-main-card">
            <div>{user?.username}</div>
        </div>
    )
}

export default MainFeedHover
