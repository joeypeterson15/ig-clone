import UpdateMainCommentModal from "../UpdateMainCommentModal";
import DeleteMainCommentModal from "../DeleteMainCommentModal/DeleteMainCommentModal";
import { useState } from "react";


function CommentMain ({ comment, user }) {


    const [showCommentMenu, setCommentMenu] = useState(false);

    const closeCommentMenu = () => {
        setCommentMenu(false);
    };

    const openCommentMenu = () => {
      if (showCommentMenu) return;
      setCommentMenu(true);
    };


    return (
        <div className='comment-edit-main-div'>
            <div className="avatar-user-body-main">
                <div className="user-username-main" >{comment?.username}</div>
                <div className="main-comment-body-div">{comment?.content}</div>

            </div>

            {comment.userId === user?.id ?

            <div>
                <div className={showCommentMenu === false ? "three-dot-close-main" : "three-dot-open-main" }>
                <i class="fas fa-ellipsis-h" onClick={showCommentMenu === false ? openCommentMenu : closeCommentMenu}></i>
            </div>
                {showCommentMenu && (
                    <div className="edit-my-comment-dropdown">
                        <UpdateMainCommentModal comment={comment}/>
                        <DeleteMainCommentModal comment={comment}/>
                    </div>
                )}
            </div>
                : ''}
        </div>
    )
}

export default CommentMain
