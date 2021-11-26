import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router'
import { useState, useEffect} from 'react';
import { deleteOnePost, getMyPosts } from '../../store/post';
import { getComments, createOneComment } from '../../store/comment';
import { getLikes } from '../../store/like';
import { createOneLike } from '../../store/like';
import DeleteCommentModal from '../DeleteCommentModal';
import { deleteMyLike } from '../../store/like';
import { Link } from 'react-router-dom';
import UpdateCommentModal from '../UpdateCommentModal';
import UpdatePostModal from '../UpdatePostModal';
import { getEveryPost } from '../../store/everyPost';
import Comment from '../Comment';
import "./Post.css"

function Post () {

    let history = useHistory()
    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    // const [showCommentMenu, setCommentMenu] = useState(false);
    const [content, setContent] = useState('')
    const [hashtags, setHashtags] = useState([])
    const [body, setBody] = useState([])
    const [lastPost, setLastPost] = useState('')
    const [nextPost, setNextPost] = useState('')

    const params = useParams()
    const {postId} = params

    const user = useSelector((state) => state.session?.user)
    const comments = useSelector((state) => Object.values(state.comments))
    const posts = useSelector(state => Object.values(state.myPosts))
    const post = useSelector((state) => Object.values(state.myPosts).find(post => post.id == postId))
    const likes = useSelector((state) => Object.values(state.likes))


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMyPosts(user?.id))
        dispatch(getComments(postId))
        dispatch(getLikes(postId))

    }, [dispatch, postId, showModal])


    const closeMenu = () => {
        setShowMenu(false);
    };

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };
    // const closeCommentMenu = () => {
    //     setCommentMenu(false);
    // };

    // const openCommentMenu = () => {
    //   if (showMenu) return;
    //   setCommentMenu(true);
    // };


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

        return(
            () => {
                setBody([]);
                setHashtags([])

            }
        )
        //  setBody(split.join(' '))
        //  console.log(body)
    }, [dispatch, showModal, post, postId])

    useEffect(() => {
        for (let i = 0; i < posts.length; i++) {
            let p = posts[i]
            let n = posts[i + 1]
            let l = posts[i - 1]
            if (p.id === post?.id) {
                if (n) setNextPost(n.id);
                if (l) setLastPost(l.id)
            }
        }

        return(
            () => {

                setNextPost('');
                setLastPost('')
                setBody([]);
                setHashtags([])
            }
        )
    }, [dispatch, postId])


    const deletePost = () => {
        dispatch(deleteOnePost(postId))
        history.push('/profile')
    }

    const createComment = (e) => {
        e.preventDefault()
        const payload = {
            content,
            postId,
            userId: user?.id,
            avatar: user?.avatar,
            username: user?.username
        }
        setContent('')
        dispatch(createOneComment(payload))
        dispatch(getComments(postId))
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

    const createLike = (e) => {
        e.preventDefault()
        const payload = {
            userId : user?.id,
            postId,
            username : user?.username
        }
        dispatch(createOneLike(payload))
    }

    const isLiked = () => {
        if (likes) {
            for (let i = 0; i < likes.length; i++){
                let like = likes[i]
                if (like.userId == user?.id) {
                    return true;
                }
            }
        }
        return false;
    }

    const deleteLike = () => {
        dispatch(deleteMyLike(user?.id, post?.id))
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

    const convertTime = function(oldTime){
        let newTime = oldTime.split(' ')[1]
        let time = newTime.split(':');
        let hours = time[0];
        let minutes = time[1];
        let timeValue = "" + ((hours >12) ? hours -12 :hours);
            timeValue += (minutes < 10) ? ':' + minutes : ":" + minutes;
            timeValue += (hours >= 12) ? " pm" : " am";
            // timeValue += "" + date
            return timeValue;
        }




    return (
        <div className="post-outer-container">
            <div className="exit-post-icon">
                <i onClick={() => history.push('/profile')} class="fas fa-times"></i>

            </div>
            <div className="post-modal-container">


                        <div className="left-image">
                            <img className="image-modal" src={post?.imageUrl}></img>
                        </div>


                        <div className="post-modal-right">
                            <div className="upper-right-modal">

                                <div className="username-avatar-div">

                                    <img className="user-avatar" alt="" src={user?.avatar}></img>
                                    <div className="username-top-bold">{user?.username}</div>

                                </div>


                                <div className="edit-delete-post">
                                    <div className="edit-post-icon">
                                        <div className={showMenu === false ? "three-dot-close" : "three-dot-open" }>
                                            <i class="fas fa-ellipsis-h" onClick={showMenu === false ? openMenu : closeMenu}></i>
                                        </div>
                                        {showMenu && (
                                            <div className="edit-my-post-dropdown">
                                                <UpdatePostModal setHashtags={setHashtags} setPostBody={setBody} setShowMenu={setShowMenu} showModal={showModal} setShowModal={setShowModal} post={post}/>
                                                <button className="edit-post-button" onClick={deletePost}>delete post</button>
                                            </div>
                                        )}
                                    </div>

                                    {/* <div onClick={openMenu} >edit</div> */}

                                </div>

                            </div>
                            <div className="bottom-right-comments">
                                <div className="middle-right-modal">
                                    <div className="post-content-and-username">
                                        <img className="user-avatar" alt="" src={user?.avatar}></img>
                                        <div className="username-bold">
                                            {user?.username}
                                        </div>
                                    </div>
                                    <div className="comment-content-post">
                                        {body.join(' ')}
                                    </div>
                                    <div>
                                        {hashtags ? hashtags.map((hashtag) => (
                                            <Link to={`/hashtags/${hashtag.substring(1)}`}>{hashtag}</Link>
                                        ))

                                    : ""}
                                    </div>
                                </div>

                                {comments ?
                                comments.map((comment) => (
                                    // <div className='comment-edit-mypost-div'>
                                    //     <div className="left-side-comment">

                                    //         <img className="user-avatar" alt="" src={comment?.avatar}></img>
                                    //         <div className="username-bold" >{comment?.username}</div>
                                    //         <div className="comment-content-post">{comment?.content}</div>

                                    //     </div>

                                    //     {comment.userId === user?.id ?

                                    //     <div>
                                    //         <div className={showMenu === false ? "three-dot-close" : "three-dot-open" }>
                                    //         <i class="fas fa-ellipsis-h" onClick={showCommentMenu === false ? openCommentMenu : closeCommentMenu}></i>
                                    //     </div>
                                    //         {showCommentMenu && (
                                    //             <div className="edit-my-comment-dropdown">
                                    //                 <UpdateCommentModal comment={comment}/>
                                    //                 <DeleteCommentModal comment={comment}/>
                                    //             </div>
                                    //         )}
                                    //     </div>
                                    //      : ''}
                                    // </div>

                                    <Comment comment={comment} user={user}/>
                                )) :
                                <div>There are currently no comments for this post</div>}
                            </div>
                            <div className="likes-post-div">
                                <div>
                                    {!isLiked()
                                    ?
                                    <div className="my-heart">

                                            <i onClick={createLike} className="far fa-heart"></i>

                                    </div>
                                        :
                                        <div className="my-heart red-heart">
                                            {/* <button onClick={deleteLike}>unlike</button> */}
                                            <i onClick={deleteLike} className="fas fa-heart"></i>
                                        </div>
                                        }
                                </div>

                                </div>

                                <div className="count-likes-mypost">
                                    {countLikes()}

                            </div>
                            <div>
                                <div>
                                    {isSameDay(post?.createdAt)
                                ?
                                <div className="time-post-div">
                                    {convertTime(post?.createdAt)}
                                </div>
                                :
                                <div className="time-stamp-post-div">
                                    {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(post?.createdAt))} {new Date(post?.createdAt).getDate()}, 2021

                                </div>
                                }


                                </div>
                            </div>
                            <div className="create-comment-right">
                                <form className="post-comment-main" onSubmit={createComment}>
                                    <input className="my-post-input-comment-main" value={content} onChange={(e) => setContent(e.target.value)} type='text' placeholder='post a comment...'></input>
                                </form>
                                    <button className={!!content ? "post-comment-submit-button-blue" : "post-comment-submit-button"} type='submit'>post</button>
                            </div>
                        </div>
                    </div>

                    {lastPost ?
                        <Link className="prev-post-icon" to={`/${lastPost}`}><div className="next-prev-icon"><i className= "fas fa-angle-left"></i></div></Link>
                    : ''}

                    {nextPost ?
                        <Link className="next-post-icon" to={`/${nextPost}`}>Next</Link>
                     : ''}






        </div>
    )
}

export default Post
