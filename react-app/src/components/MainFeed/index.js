import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getFollows } from '../../store/follow';
import { getAllPosts } from '../../store/allPost';
import { getMainFeedPosts } from '../../store/mainFeedPosts';
import { Link } from 'react-router-dom';
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
                // <div className="main-feed-posts">
                //     <div className="upper-username-avatar-container">
                //         <img className="main-feed-avatar" alt="" src={post?.avatar}></img>
                //         <Link to={`/p/${post?.userId}`} className="main-feed-username-upper">{post?.username}</Link>
                //     </div>
                //     <img className="main-feed-image" src={post?.imageUrl}></img>
                //     <div className="main-feed-lower">
                //         <div className="main-lower-username">{post?.username}</div>
                //         <div>{post?.body}</div>
                //     </div>
                // </div>
            )) : <div>You need to follow people before you can see their posts!</div>}
        </div>
    )
}

export default MainFeed;
