import { getReplyLikes, createOneReplyLike, deleteOneReplyLike } from "../../store/replyLike";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import './ReplyLike.css'

function ReplyLike ({ reply}) {

    const sessionUser = useSelector((state) => state.session?.user)
    const replyLikes = useSelector(state => Object.values(state.replylikes).filter(r => r.replyId == reply?.id))


    const dispatch = useDispatch()


    const isLiked = () => {
        if (replyLikes) {
            for (let i = 0; i < replyLikes.length; i++){
                let like = replyLikes[i]
                if (like.userId == sessionUser?.id) {
                    return true;
                }
            }
        }
        return false;
    }

    // const count = () => {
    //     let count = 0;
    //     if (replyLikes) {
    //         for (let i = 0; i < replyLikes.length; i++) {
    //             count += 1;
    //         }
    //     }
    //     return count
    // }






    const createReplyLike = () => {

        const payload = {
            userId : sessionUser?.id,
            replyId : reply?.id,
            username : sessionUser?.username
        }
        dispatch(createOneReplyLike(payload))
    }

    const deleteReply = () => {

        dispatch(deleteOneReplyLike(sessionUser?.id, reply?.id))
    }



    return (
        <div>

                        {!isLiked()
                            ?
                            <div className="reply-heart">
                                <i onClick={() => createReplyLike(reply?.id)} className="far fa-heart"></i>
                            </div> :
                            <div className="red-reply-heart">

                                <i onClick={() => deleteReply(reply?.id)} className="fas fa-heart"></i>
                        </div> }

                        

         </div>
    )
}

export default ReplyLike
