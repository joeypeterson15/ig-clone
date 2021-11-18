import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getFollows } from '../../store/follow';
import { getAllPosts } from '../../store/allPost';
import { getMainFeedPosts } from '../../store/mainFeedPosts';
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
                <div className="main-feed-posts">
                    <img className="main-feed-image" src={post?.imageUrl}></img>
                    <div>{post?.body}</div>
                </div>
            )) : <div>You need to follow people before you can see their posts!</div>}
        </div>
    )
}

export default MainFeed;
