import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getMyPosts } from '../../store/post';
import { Link } from 'react-router-dom';
import { getFollowers } from '../../store/followers';
import { getFollows } from '../../store/follow';
import './Profile.css'
import { getEveryPost } from '../../store/everyPost';

function Profile () {



    const user = useSelector((state) => state.session?.user)
    const posts = useSelector((state) => Object.values(state.myPosts))
    const follows = useSelector((state) => Object.values(state.follows))
    const followers = useSelector(state => Object.values(state.followers))
    // const posts = useSelector((state) => Object.values(state.posts).filter(post => post.userId === user?.id))


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyPosts(user?.id))
        dispatch(getFollows(user?.id))
        dispatch(getFollowers(user?.id))
        // dispatch(getEveryPost())
    }, [dispatch])

    const countPosts = () => {
        let count = 0
        for (let i = 0; i < posts.length; i++) {
            count ++
        }
        return count
    }

    const count = (list) => {
        let count = 0;
        for (let i = 0; i<list.length; i++) {
            count += 1
        }
        return count;
    }

    return (
        <div className="background-color">
            <div className="my-profile-container">
                <div className="profile-picture" style={{backgroundImage: `url(${user?.avatar})`}}></div>
                <div className="my-profile-content">
                        <div className="top-my-profile-content">
                            <div className="profile-username">{user?.username}</div>
                            <button>edit profile</button>
                        </div>
                        <div className="middle-my-profile-content">
                            <div className="flex">
                                <div className="bold-numbers">{countPosts()}</div>
                                <div className='space'>posts</div>
                            </div>
                            <div className="flex">
                                <div className="bold-numbers">{count(followers)}</div>
                                <div className='space'>followers</div>
                            </div>
                            <div className="flex">
                                <div className="bold-numbers">{count(follows)}</div>
                                <div className='space'>following</div>
                            </div>

                        </div>
                        <div className="bio-content">
                            <div>Bio</div>
                        </div>
                </div>
            </div>

            { posts ? <div className="my-posts-container">
                {posts.map((post) => (
                    <Link to={`/${post.id}`}>
                        <div className="post-image-div" key={post.id}>
                            <img className="post-image" src={post.imageUrl}></img>
                            {/* <div>{post.body}</div> */}
                        </div>
                    </Link>
                ))}
            </div> : <div>You don't have any posts yet!</div>}
        </div>
    )
}

export default Profile;
