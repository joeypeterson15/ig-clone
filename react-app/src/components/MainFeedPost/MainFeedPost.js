import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect} from 'react';
import { getUser } from '../../store/user';
import { createMainFeedComment } from '../../store/mainComments';
import { getMainFeedComments } from '../../store/mainComments';
import DeleteMainCommentModal from '../DeleteMainCommentModal/DeleteMainCommentModal';
import { deleteOneMainLike, createOneMainLike, getMainLikes } from '../../store/mainLikes';
import UpdateMainCommentModal from '../UpdateMainCommentModal';
import { createOneChannel } from '../../store/channel';
import { useHistory } from 'react-router';
import { getChannels } from '../../store/channel';
import MainFeedHover from '../MainFeedHover';


const MainFeedPost = ({ post }) => {

    let history = useHistory()
    const [content, setContent] = useState('')
    const sessionUser = useSelector((state) => state.session?.user)
    const comments = useSelector((state) => Object.values(state.mainFeedComments).filter((comment) => comment.postId === post?.id))
    const likes = useSelector((state) => Object.values(state.mainLikes).filter((like) => like.postId === post?.id))
    const channel = useSelector(state => Object.values(state.channels).find(channel => channel.friendId == post?.userId))
    const [hashtags, setHashtags] = useState([])
    const [body, setBody] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser(post?.userId))
        dispatch(getMainFeedComments(post?.id))
        dispatch(getMainLikes(post?.id))
        dispatch(getChannels(sessionUser?.id))

    }, [dispatch])

    useEffect(() => {
        let split = post?.body.split(" ")
        for (let i = 0; i < split.length; i++) {
            let e = split[i];
            if (e.includes("#")) {
                setHashtags(old => [...old, e])
                // split.splice(i,1)
            } else {
                setBody(old => [...old, e])
            }
        }
        //  setBody(split.join(' '))
        //  console.log(body)
    }, [dispatch])

    const isLiked = () => {
        if (likes) {
            for (let i = 0; i < likes.length; i++){
                let like = likes[i]
                if (like.userId == sessionUser?.id) {
                    return true;
                }
            }
        }
        return false;
    }

    const createComment = (e) => {
        e.preventDefault()
        const payload = {
            content,
            postId : post?.id,
            userId: sessionUser?.id,
            avatar: sessionUser?.avatar,
            username: sessionUser?.username
        }
        setContent('')
        dispatch(createMainFeedComment(payload))
        dispatch(getMainFeedComments(post?.id))
    }

    const countLikes = () => {
        let count = 0;
        for (let i = 0; i < likes.length; i++) {
            count ++;
        }
        if (count === 1) {
            return '1 like'
        }
        return `${count} likes`
    }
    const countComments = () => {
        let count = 0;
        if(comments) {
            for (let i = 0; i < comments.length; i++) {
                count ++;
            }
            if (count === 1) {
                return '1 comment'
            }
            return `${count} comments`

        }
        return '0 comments';
    }

    const createLike = (e) => {
        e.preventDefault()
        const payload = {
            userId : sessionUser?.id,
            postId : post?.id,
            username : sessionUser?.username
        }
        dispatch(createOneMainLike(payload))
    }

    const deleteLike = () => {
        dispatch(deleteOneMainLike(sessionUser?.id, post?.id))
    }

    const isSameDay = function(oldTime) {
        // let today = Date.now().getDate().toString()
        let newToday = new Date().getDate().toString()
        let newOldTime = new Date(oldTime).getDate()
        console.log('todays date:', newToday)
        console.log('message date:', newOldTime)
        if (newToday == newOldTime){
            return true
        }
        return false
    }

    const hoursAgo = function(createdAt) {
        const now = new Date(Date.now()).getHours()
        const post = createdAt.split(' ')[1].split(':')[0]
        console.log('hournow', now)
        console.log('hourpost', post)
        return (Number(now) - Number(post))
    }

    const daysAgo = function(createdAt) {
        let now = new Date().getDate().toString()
        let post = new Date(createdAt).getDate()
        console.log('daynow', now)
        console.log('daypost', post)
        if ((now - post) === 1 ) return "1 DAY AGO"
        else return (Number(now) - Number(post)) + "DAYS AGO"
    }



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

    return (
        <>
            <div className="main-feed-posts">
                <div className="upper-username-avatar-container">
                    <img className="main-feed-avatar" alt="" src={post?.avatar}></img>
                    <div className="username-div-with-hover">
                        <Link to={`/p/${post?.userId}`} className="main-feed-username-upper">
                            {post?.username}
                        </Link>
                        <MainFeedHover post={post}/>

                    </div>
                </div>
                <img className="main-feed-image" src={post?.imageUrl}></img>
                <div className="likes-post-div">
                        <div className="icons-under-image-post">
                            {!isLiked()
                            ?
                            <div className="heart">

                                    <i onClick={createLike} className="far fa-heart"></i>

                            </div>
                                :
                                <div className="heart red-heart">

                                    <i onClick={deleteLike} className="fas fa-heart"></i>
                                </div>
                                }
                            <div className="heart comment-icon">

                                <Link className="view-all-comments-icon" to={`/main/${post.id}`}><i class="far fa-comment"></i></Link>
                            </div>

                            <div className="heart messages-icon">
                                <i class="far fa-paper-plane" onClick={createChannel}></i>
                            </div>
                        </div>

                        </div>

                    <div className="count-likes-main">
                            {countLikes()}

                    </div>

                <div className="main-feed-lower">
                    <div className="main-lower-username">{post?.username}</div>
                    {/* <div>{post?.body}</div> */}
                    <div className="middle-right-modal-post">
                        <div className="post-body-without-hashtags">
                            {body.join(' ')}
                        </div>
                        <div className="hashtags">
                            {hashtags ? hashtags.map((hashtag) => (
                                <Link className="hashtag-link" to={`/hashtags/${hashtag.substring(1)}`}>{hashtag}</Link>
                            ))

                        : ""}
                        </div>
                    </div>
                </div>

                <div className="bottom-right-main-comments">
                    <Link className="view-all-comments-link" to={`/main/${post.id}`}>View all {countComments()}</Link>
                    {comments ?
                    comments.slice(0,2).map((comment) => (

                        <div className='comment-edit-main-div'>
                            <div className="avatar-user-body-main">
                                {/* <img alt="" className="user-avatar-main" src={comment?.avatar}></img> */}
                                <div className="user-username-main">{comment?.username}</div>
                                <div className="main-comment-body-div">
                                    {comment?.content}
                                </div>
                            </div>

                            {comment?.userId === sessionUser?.id ?
                            <div className="edit-delete-comment-div">
                                    <UpdateMainCommentModal comment={comment}/>
                                    <DeleteMainCommentModal comment={comment}/>

                            </div>
                         : ''}
                        </div>


                    )) :
                    <div>There are currently no comments for this post</div>}
                </div>
                    <div className="date-or-time-created">
                        {isSameDay(post?.createdAt) ?

                                hoursAgo(post?.createdAt) + ' HOURS AGO'

                            :
                            daysAgo(post?.createdAt)}
                    </div>


                <div >
                    <form className="post-comment-main" onSubmit={createComment}>
                        <input className="input-comment-main" value={content} onChange={(e) => setContent(e.target.value)} type='text' placeholder='post a comment...'></input>
                    </form>
                        <button className={!!content ? "post-comment-submit-button-blue" : "post-comment-submit-button"} type='submit'>post</button>

                </div>
            </div>
        </>
    )
}


export default MainFeedPost;
