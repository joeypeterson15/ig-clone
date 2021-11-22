import { getUser } from "../../store/user"
import { useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllPosts } from "../../store/allPost";
import { createOneChannel } from "../../store/channel";
import { getEveryPost } from "../../store/everyPost";
import { getFollows } from "../../store/follow";
import { getFollowers } from "../../store/followers";

import "./MainFeedHover.css"


function MainFeedHover ({ post }) {
    const dispatch = useDispatch()
    const userId = post?.id
    const user = useSelector(state => state.user[0])
    const channel = useSelector(state => Object.values(state.channels).find(channel => channel.friendId == post?.userId))
    const sessionUser = useSelector((state) => state.session?.user)
    const posts = useSelector((state) => Object.values(state.mainFeedPosts).filter(post => post?.userId == userId))
    const follows = useSelector((state) => Object.values(state.follows))
    const followers = useSelector(state => Object.values(state.followers))



    let history = useHistory()

    useEffect(() => {
        dispatch(getEveryPost())
        dispatch(getUser(post?.userId))
        dispatch(getAllPosts(post?.userId))
        dispatch(getFollows(post?.userId))
        dispatch(getFollowers(post?.userId))
    }, [dispatch])


    const createChannel = () => {

        if (!channel) {

            const payload = {
                friendId : post?.userId,
                friendAvatar : post?.avatar,
                friendUsername : post?.username,
                userId: sessionUser?.id
            }
            dispatch(createOneChannel(payload))
            history.push(`/messages/${sessionUser?.id}/${post?.userId}`)

        } else {
            history.push(`/messages/${sessionUser?.id}/${post?.userId}`)
        }

    }

    const count = (list) => {
        let count = 0;
        for (let i = 0; i<list.length; i++) {
            count += 1
        }
        return count;
    }

    return (
        <div className="hover-username-main-feed">
            <div className="hover-card">
                <div className="upper-hover-div">
                    <img className="hover-avatar" alt="" src={post?.avatar}></img>
                    <div>{post?.username}</div>
                </div>
                <div className="number-category-div">
                    <div className="number-category">
                        <div className="number-hover">{count(posts)}</div>
                        <div className="category-name">{count(posts) === 1 ? 'post' : 'posts'}</div>
                    </div>
                    <div className="number-category">
                        <div className="number-hover">{count(followers)}</div>
                        <div className="category-name">followers</div>
                    </div>
                    <div className="number-category">
                        <div className="number-hover">{count(follows)}</div>
                        <div className="category-name">following</div>
                    </div>
                </div>
                <div className="hover-posts-container">
                    <img alt="" src={posts[0]?.imageUrl} className="hover-post-in-container"></img>
                    {posts[1] ?

                        <img alt="" src={posts[1]?.imageUrl} className="hover-post-in-container"></img>
                    : ''}
                    {posts[2] ?

                        <img alt="" src={posts[2]?.imageUrl} className="hover-post-in-container"></img>
                    : ''}
                </div>
                <div className="bottom-buttons-hover">
                    <button className="button-hover">Unfollow</button>
                    <button className="button-hover" onClick={createChannel}>Message</button>
                </div>
            </div>
        </div>
    )
}

export default MainFeedHover
