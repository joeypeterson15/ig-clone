import { createOneReply } from "../../store/reply"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import './Reply.css'

function Reply ({setCommentId, replies, commentId, comment}) {

    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session?.user)
    const [reply, setReply] = useState('')

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


    return (
        <div>
            {replies.map(reply => (

            <div>

                    <div className="left-side-reply-comment">

                        <img className="user-avatar" alt="" src={reply?.avatar}></img>
                        <div className="username-reply-bold" >{reply?.username}</div>
                        <div className="reply-content">
                            <Link className="hashtag-link" to={comment?.userId === sessionUser?.id ? `/profile` :`/p/${comment?.userId}`}>
                                @{comment?.username}
                            </Link>
                            {reply?.content}
                        </div>

                    </div>


                    <div className="comment-likes-reply-div">
                        <div>
                        {isSameDay(reply?.createdAt) ?

                        hoursAgo(reply?.createdAt) + 'h'

                        :
                        daysAgo(reply?.createdAt)}
                        </div>
                        {/* <div className="count-comment-likes">

                            {count()} likes
                        </div>
                        <div onClick={setupReply(reply)} className="reply-div">reply</div> */}

                    </div>
            </div>
            ))}
            {/* <form onSubmit={createReply}>
                    <input type="text" placeholder="reply" value={reply} onChange={(e) => setReply(e.target.value)}></input>
                    <button type="submit">Reply</button>
                </form> */}
        </div>
    )
}

export default Reply
