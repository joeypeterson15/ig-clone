import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router'
import { getUser } from '../../store/user';
import { getUserPosts } from '../../store/userPost';
import { createOneFollow } from '../../store/follow';
import { getFollows } from '../../store/follow';
import { getAllFollows } from '../../store/allFollows';
import UnfollowModal from '../UnfollowModal';
import { getFollowers } from '../../store/followers';
import '../Profile/Profile.css'



function UserProfile () {

    const [isFollowed, setIsFollowed] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const params = useParams()
    const {userId} = params
    const sessionUser = useSelector((state) => state.session?.user)
    const userFollows = useSelector((state) => Object.values(state.allFollows).filter(follow => follow.userId === userId))
    const follows = useSelector((state) => Object.values(state.follows))
    const followers = useSelector(state => Object.values(state.followers))
    // const follow = useSelector((state) => Object.values(state.follows).find(follow => follow.followId === userId))
    console.log(follows)

    const user = useSelector((state) => Object.values(state.user)[0])
    const posts = useSelector((state) => Object.values(state.userPosts))

    const dispatch = useDispatch()



        useEffect(() => {
            dispatch(getFollows(sessionUser?.id))
            dispatch(getAllFollows())
            dispatch(getFollowers(userId))
            dispatch(getUser(userId))
            dispatch(getUserPosts(userId))
        }, [dispatch, userId, sessionUser, showModal])

        useEffect(() => {
            for (let i = 0; i < follows.length; i++) {
                let follow = follows[i];
                if (follow.followId === Number(userId)) {
                    setIsFollowed(true)

                }
            }

        },[dispatch, follows, showModal])




    const countPosts = () => {
        let count = 0
        for (let i = 0; i < posts.length; i++) {
            count ++
        }
        return count
    }

    const createFollow = (e) => {
        e.preventDefault()
        const payload = {
            userId : sessionUser?.id,
            followId : userId
        }
        dispatch(createOneFollow(payload))
    }

    const count = (list) => {
        let count = 0;
        for (let i = 0; i<list.length; i++) {
            count += 1
        }
        return count;
    }


    return (
        <>
            <div className="my-profile-container">
                <div className="profile-picture" style={{backgroundImage: `url(${user?.avatar})`}}></div>
                <div className="my-profile-content">
                        <div className="top-my-profile-content">
                            <div className="user-profile-username">{user?.username}</div>
                            <button className="message-user-profile-button">Message</button>
                            <div>
                                {!isFollowed ? <button onClick={createFollow} className="follow-button">Follow</button>
                                :
                                <UnfollowModal setIsFollowed={setIsFollowed} showModal={showModal} setShowModal={setShowModal} userId={sessionUser?.id} followId={userId}/>}
                            </div>
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
                                <div className="bold-numbers">{count(userFollows)}</div>
                                <div className='space'>following</div>
                            </div>

                        </div>
                        <div className="bottom-my-profile-content">
                            <div>Bio</div>
                        </div>
                </div>
            </div>

            { posts ? <div className="my-posts-container">
                {posts.map((post) => (
                    <Link to={`/p/${userId}/${post?.id}`}>
                        <div key={post.id}>
                            <img alt="" className="post-image" src={post.imageUrl}></img>
                            {/* <div>{post.body}</div> */}
                        </div>
                    </Link>
                ))}
            </div> : <div>You don't have any posts yet!</div>}
        </>
    )
}

export default UserProfile;
