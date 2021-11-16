import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getMyPosts } from '../../store/post';
import './Profile.css'

function Profile () {
    const user = useSelector((state) => state.session?.user)
    const posts = useSelector((state) => Object.values(state.myPosts))

    const countPosts = () => {
        let count = 0
        for (let i = 0; i < posts.length; i++) {
            count ++
        }
        return count
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyPosts(user?.id))
    }, [dispatch])

    return (
        <>
            <div className="my-profile-container">
                <div className="profile-picture" style={{backgroundImage: `url(${user?.avatar})`}}></div>
                <div className="my-profile-content">
                        <div className="top-my-profile-content">
                            <div>{user?.username}</div>
                            <button>edit profile</button>
                        </div>
                        <div className="middle-my-profile-content">
                            <div>{countPosts()} posts</div>
                            <div># of followers</div>
                            <div># of following</div>
                        </div>
                        <div className="bottom-my-profile-content">
                            <div>Bio</div>
                        </div>
                </div>
            </div>

            <div className="my-posts-container">
                {posts ? posts.map((post) => (
                    <div key={post.id}>
                        <img className="post-image" src={post.imageUrl}></img>
                        <div>{post.body}</div>
                    </div>
                )) : <div>You don't have any posts yet!</div>}
            </div>
        </>
    )
}

export default Profile;
