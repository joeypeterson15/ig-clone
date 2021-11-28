import UpdateCommentModal from "../UpdateCommentModal"
import DeleteCommentModal from "../DeleteCommentModal"
import { useState, useEffect } from "react";
import { getCommentLikes } from "../../store/commentLikes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createOneCommentLike } from "../../store/commentLikes";
import { deleteOneCommentLike } from "../../store/commentLikes";
import { getReplies, createOneReply } from "../../store/reply";
import Reply from "../Reply";
import './Comment.css'


function Comment ({ setCommentId, comment, user }) {

    const dispatch = useDispatch()
    // const [reply, setReply] = useState('')
    const commentId = comment?.id
    const [showCommentMenu, setCommentMenu] = useState(false);
    const sessionUser = useSelector((state) => state.session?.user)
    const replies = useSelector(state => Object.values(state.replies).filter(reply => reply.commentId === comment?.id))
    // const commentLikes = useSelector(state => Object.values(state.commentLikes))
    const commentLikes = useSelector(state => Object.values(state.commentLikes).filter(c => c?.commentId == comment?.id))
    console.log(replies)

    const [showMenu, setShowMenu] = useState(false);


    const closeMenu = () => {
        setShowMenu(false);
    };

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };


    useEffect(() => {
        dispatch(getCommentLikes(comment?.id))
        dispatch(getReplies(comment?.id))
    }, [dispatch])

    const closeCommentMenu = () => {
        setCommentMenu(false);
    };

    const openCommentMenu = () => {
      if (showCommentMenu) return;
      setCommentMenu(true);
    };

    const count = () => {
        let count = 0;
        if (commentLikes) {
            for (let i = 0; i < commentLikes.length; i++) {
                count += 1;
            }
        }
        return count
    }
    const countReplies = () => {
        let count = 0;
        if (replies) {
            for (let i = 0; i < replies.length; i++) {
                count += 1;
            }
        }
        return count
    }

    const isLiked = () => {
        if (commentLikes) {
            for (let i = 0; i < commentLikes.length; i++){
                let like = commentLikes[i]
                if (like.userId == sessionUser?.id) {
                    return true;
                }
            }
        }
        return false;
    }




    const createCommentLike = (e) => {
        e.preventDefault()
        const payload = {
            userId : sessionUser?.id,
            commentId,
            username : sessionUser?.username
        }
        dispatch(createOneCommentLike(payload))
    }

    const deleteLike = () => {
        dispatch(deleteOneCommentLike(sessionUser?.id, comment?.id))
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
        if ((now - post) === 1 ) return "1d"
        else return (Number(now) - Number(post)) + "d"
    }

    // const createReply = (e) => {
    //     e.preventDefault()
    //     const payload = {
    //         content: reply,
    //         commentId: comment?.id,
    //         userId: sessionUser?.id,
    //         avatar: sessionUser?.avatar,
    //         username: sessionUser?.username
    //     }
    //     dispatch(createOneReply(payload))

    // }

    const setupReply = (comment) => (e) => {
        e.preventDefault();
        const input = document.getElementById('my-post-input-comment-main')
        input.value = "@" + comment?.username
        setCommentId(comment?.id)
        if (showMenu === false) {
            setShowMenu(true)
        }


    }


    return (
        <div className='comment-edit-mypost-div'>
            <div >
                <div className="left-side-comment">

                    <img className="user-avatar" alt="" src={comment?.avatar}></img>
                    <div className="username-bold" >{comment?.username}</div>
                    <div className="comment-content-post">{comment?.content}</div>

                </div>
            <div className="comment-likes-div">
                <div>
                {isSameDay(comment?.createdAt) ?

                hoursAgo(comment?.createdAt) + 'h'

                :
                daysAgo(comment?.createdAt)}
                </div>
                <div className="count-comment-likes">

                    {count()} likes
                </div>
                <div onClick={setupReply(comment)} className="reply-div">Reply</div>

            </div>
            {replies ?

                <div className="view-replies" onClick={showMenu === false ? openMenu : closeMenu}>
                    ------ view {countReplies()} replies
                </div>
                :
                ""
        }

                {showMenu && (
                //     <div>
                //     {replies.map(reply => (

                //         <div>{reply?.content}</div>
                //     ))}
                // </div>
                <Reply setCommentId={setCommentId} replies={replies} commentId={comment?.id}/>
                )}



                {/* <form onSubmit={createReply}>
                    <input type="text" placeholder="reply" value={reply} onChange={(e) => setReply(e.target.value)}></input>
                    <button type="submit">Reply</button>
                </form> */}

            </div>

            {comment.userId === user?.id ?

            <div className="flex">
                <div className={showCommentMenu === false ? "three-dot-close-main" : "three-dot-open-main" }>
                    <i class="fas fa-ellipsis-h" onClick={showCommentMenu === false ? openCommentMenu : closeCommentMenu}></i>
                </div>

                {!isLiked()
                            ?
                <div className="comment-heart">
                    <i onClick={createCommentLike} className="far fa-heart"></i>
                </div> :
                <div className="red-comment-heart">

                    <i onClick={deleteLike} className="fas fa-heart"></i>
                </div> }


                {showCommentMenu && (
                    <div className="edit-my-comment-dropdown">
                        <UpdateCommentModal setCommentMenu={setCommentMenu} comment={comment}/>
                        <DeleteCommentModal setCommentMenu={setCommentMenu} comment={comment}/>
                    </div>
                )}
            </div>
                : ''}
        </div>
    )
}

export default Comment
