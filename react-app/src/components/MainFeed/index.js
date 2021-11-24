import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getMainFeedPosts } from '../../store/mainFeedPosts';
import MainFeedPost from '../MainFeedPost/MainFeedPost';

import "./MainFeed.css"

function MainFeed () {
    const posts = useSelector((state) => Object.values(state.mainFeedPosts))
    const sessionUser = useSelector((state) => state.session?.user)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMainFeedPosts(sessionUser?.id))
    }, [dispatch])

    return (
        <div className="main-feed-outer-container">
            {posts ? posts.map((post) => (
                <MainFeedPost post={post} />
            )) : <div>You need to follow people before you can see their posts!</div>}
        </div>
    )
}

export default MainFeed;
