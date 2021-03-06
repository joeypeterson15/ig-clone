import UpdateMainCommentModal from "../UpdateMainCommentModal";
import DeleteMainCommentModal from "../DeleteMainCommentModal/DeleteMainCommentModal";
import { getCommentLikes, createOneCommentLike } from "../../store/commentLikes";
import { deleteOneCommentLike } from "../../store/commentLikes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";


function CommentMain ({ comment, user }) {

    const commentLikes = useSelector(state => Object.values(state.commentLikes).filter(c => c?.commentId == comment?.id))
    const [showCommentMenu, setCommentMenu] = useState(false);
    const [clicked, setClicked] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCommentLikes(comment?.id))
    }, [dispatch])

    const closeCommentMenu = () => {
        setCommentMenu(false);
        setClicked(false)
    };

    const openCommentMenu = () => {
      if (showCommentMenu) return;
      setClicked(true)
      setCommentMenu(true);
    };

    const isLiked = () => {
        if (commentLikes) {
            for (let i = 0; i < commentLikes.length; i++){
                let like = commentLikes[i]
                if (like.userId == user?.id) {
                    return true;
                }
            }
        }
        return false;
    }

    const createCommentLike = (e) => {
        e.preventDefault()
        const payload = {
            userId : user?.id,
            commentId : comment?.id,
            username : user?.username
        }
        dispatch(createOneCommentLike(payload))
    }

    const deleteLike = () => {
        dispatch(deleteOneCommentLike(user?.id, comment?.id))
    }


    return (
        <div className='comment-edit-main-div'>
            <div className="avatar-user-body-main">
                <div className="user-username-main" >{comment?.username}</div>
                <div className="main-comment-body-div">{comment?.content}</div>

            </div>


            <div className="flex-for-life">
            {comment.userId === user?.id ?
                <div className={showCommentMenu === false ?  "three-dot-close-main" : "three-dot-open-main" }>
                    <i class="fas fa-ellipsis-h" onClick={showCommentMenu === false ? openCommentMenu : closeCommentMenu}></i>
                </div>
            : ''}
                {!isLiked()
                            ?
                <div className="comment-main-heart">
                    <i onClick={createCommentLike} className="far fa-heart"></i>
                </div> :
                <div className="red-comment-main-heart">

                    <i onClick={deleteLike} className="fas fa-heart"></i>
                </div> }

                {showCommentMenu && (
                    <div className="edit-my-comment-dropdown">
                        <UpdateMainCommentModal setCommentMenu={setCommentMenu} comment={comment}/>
                        <DeleteMainCommentModal setCommentMenu={setCommentMenu} comment={comment}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentMain
