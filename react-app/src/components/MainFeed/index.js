import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getMainFeedPosts } from '../../store/mainFeedPosts';
import MainFeedPost from '../MainFeedPost/MainFeedPost';
import { getAllFollows } from '../../store/allFollows';
import { getMainFeedComments } from '../../store/mainComments';


import BFS from '../BFS';

import "./MainFeed.css"

function MainFeed () {
    const posts = useSelector((state) => Object.values(state.mainFeedPosts))
    const sessionUser = useSelector((state) => state.session?.user)
    const user = useSelector((state) => state.session?.user)
    const [users, setUsers] = useState([]);
    const follows = useSelector((state) => Object.values(state.allFollows))
    const allComments = useSelector((state) => Object.values(state.mainFeedComments))





    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMainFeedPosts(sessionUser?.id))
        dispatch(getAllFollows())
        dispatch(getMainFeedComments())


    }, [dispatch, sessionUser])



    return (
        <>
            <div className="main-feed-outer-container">
                {posts ? posts.map((post) => (
                    <MainFeedPost allFollows={follows} post={post} allComments={allComments} />
                )) : <div>You need to follow people before you can see their posts!</div>}
            </div>
            <BFS follows={follows} posts={posts} />

        </>
    )
}

export default MainFeed;
