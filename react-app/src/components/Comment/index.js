import UpdateCommentModal from "../UpdateCommentModal"
import DeleteCommentModal from "../DeleteCommentModal"
import { useState, useEffect } from "react";
import { getCommentLikes } from "../../store/commentLikes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createOneCommentLike } from "../../store/commentLikes";
import { deleteOneCommentLike } from "../../store/commentLikes";


function Comment ({ comment, user }) {

    const dispatch = useDispatch()
    const commentId = comment?.id
    const [showCommentMenu, setCommentMenu] = useState(false);
    const sessionUser = useSelector((state) => state.session?.user)
    // const commentLikes = useSelector(state => Object.values(state.commentLikes))
    const commentLikes = useSelector(state => Object.values(state.commentLikes).filter(c => c?.commentId == comment?.id))
    console.log(commentLikes)


    useEffect(() => {
        dispatch(getCommentLikes(comment?.id))
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
        if ((now - post) === 1 ) return "1 DAY AGO"
        else return (Number(now) - Number(post)) + " DAYS AGO"
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
            </div>

            </div>

            {comment.userId === user?.id ?

            <div>
                {!isLiked()
                            ?
                <div className="comment-heart">
                    <i onClick={createCommentLike} className="far fa-heart"></i>
                </div> :
                <div className="red-comment-heart">

                    <i onClick={deleteLike} className="fas fa-heart"></i>
                </div> }

                <div className={showCommentMenu === false ? "three-dot-close" : "three-dot-open" }>
                <i class="fas fa-ellipsis-h" onClick={showCommentMenu === false ? openCommentMenu : closeCommentMenu}></i>
            </div>
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
