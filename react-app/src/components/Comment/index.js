import UpdateCommentModal from "../UpdateCommentModal"
import DeleteCommentModal from "../DeleteCommentModal"
import { useState } from "react";


function Comment ({ comment, user }) {


    const [showCommentMenu, setCommentMenu] = useState(false);

    const closeCommentMenu = () => {
        setCommentMenu(false);
    };

    const openCommentMenu = () => {
      if (showCommentMenu) return;
      setCommentMenu(true);
    };


    return (
        <div className='comment-edit-mypost-div'>
            <div className="left-side-comment">

                <img className="user-avatar" alt="" src={comment?.avatar}></img>
                <div className="username-bold" >{comment?.username}</div>
                <div className="comment-content-post">{comment?.content}</div>

            </div>

            {comment.userId === user?.id ?

            <div>
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
