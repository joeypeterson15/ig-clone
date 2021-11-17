import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router'
import { getUser } from '../../store/user';
import { getUserPosts } from '../../store/userPost';
import '../Profile/Profile.css'


function UserProfile () {

    const params = useParams()
    const {userId} = params

    const user = useSelector((state) => Object.values(state.user)[0])
    const posts = useSelector((state) => Object.values(state.userPosts))

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUser(userId))
        dispatch(getUserPosts(userId))
    }, [dispatch])

    const countPosts = () => {
        let count = 0
        for (let i = 0; i < posts.length; i++) {
            count ++
        }
        return count
    }

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

            { posts ? <div className="my-posts-container">
                {posts.map((post) => (
                    <Link to={`/p/${userId}/${post.id}`}>
                        <div key={post.id}>
                            <img className="post-image" src={post.imageUrl}></img>
                            {/* <div>{post.body}</div> */}
                        </div>
                    </Link>
                ))}
            </div> : <div>You don't have any posts yet!</div>}
        </>
    )
}

export default UserProfile;
