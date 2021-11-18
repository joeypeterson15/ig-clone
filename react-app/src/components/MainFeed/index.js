import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getFollows } from '../../store/follow';
import { getAllPosts } from '../../store/allPost';
import { getMainFeedPosts } from '../../store/mainFeedPosts';

function MainFeed () {
    const posts = useSelector((state) => Object.values(state.mainFeedPosts))
    const sessionUser = useSelector((state) => state.session?.user)

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getMainFeedPosts(sessionUser?.id))
    }, [dispatch])

    return (
        <>
            {posts ? posts.map((post) => (
                <div>
                    <img src={post?.imageUrl}></img>
                    <div>{post?.body}</div>
                </div>
            )) : <div>You need to follow people before you can see their posts!</div>}
        </>
    )
}

export default MainFeed;
