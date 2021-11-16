import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

function MainFeed () {
    const user = useSelector((state) => state.session?.user)
    const posts = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(getPosts(user?.id))
    }, [dispatch])

    return (
        <>
            {posts ? posts.map((post) => (
                <div>
                    <img src={post.imageUrl}></img>
                    <div>{post.body}</div>
                </div>
            )) : <div>You need to follow people before you can see their posts!</div>}
        </>
    )
}

export default MainFeed;
