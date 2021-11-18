import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router'
import { useState, useEffect} from 'react';
import { getUser } from '../../store/user';
import { getComments, createOneComment } from '../../store/comment';
import { createMainFeedComment } from '../../store/mainComments';
import { getLikes } from '../../store/like';
import { createOneLike } from '../../store/like';

import DeleteCommentModal from '../DeleteCommentModal';
import { getMainFeedComments } from '../../store/mainComments';
import DeleteMainCommentModal from '../DeleteMainCommentModal/DeleteMainCommentModal';
import { deleteOneMainLike, createOneMainLike, getMainLikes } from '../../store/mainLikes';

const MainFeedPost = ({ post }) => {

    const [showMenu, setShowMenu] = useState(false);
    const [content, setContent] = useState('')
    const sessionUser = useSelector((state) => state.session?.user)
    const user = useSelector((state) => Object.values(state.user)[0])
    const comments = useSelector((state) => Object.values(state.mainFeedComments).filter((comment) => comment.postId === post?.id))
    const likes = useSelector((state) => Object.values(state.mainLikes).filter((like) => like.postId === post?.id))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser(post?.userId))
        dispatch(getMainFeedComments(post?.id))
        dispatch(getMainLikes(post?.id))

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
            userId: sessionUser?.id
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

    return (
        <>
            <div className="main-feed-posts">
                <div className="upper-username-avatar-container">
                    <img className="main-feed-avatar" alt="" src={post?.avatar}></img>
                    <Link to={`/p/${post?.userId}`} className="main-feed-username-upper">{post?.username}</Link>
                </div>
                <img className="main-feed-image" src={post?.imageUrl}></img>
                <div className="main-feed-lower">
                    <div className="main-lower-username">{post?.username}</div>
                    <div>{post?.body}</div>
                </div>

                <div className="bottom-right-comments">
                    {comments ?
                    comments.map((comment) => (
                        <div className='comment-edit-div'>
                            <div>{comment?.content}</div>
                            {comment?.userId === sessionUser?.id ?
                            <DeleteMainCommentModal comment={comment}/> : ''}
                        </div>


                    )) :
                    <div>There are currently no comments for this post</div>}
                </div>
                <div className="likes-right-div">
                    <div>
                        {!isLiked()
                        ?
                        <form onSubmit={createLike}>
                            <button type="submit">like this post</button>
                        </form>
                        :
                        <div>
                            <button onClick={deleteLike}>unlike</button>
                        </div>
                        }

                        </div>
                        {countLikes()}
                    </div>
                <div className="create-comment-right">

                    <form onSubmit={createComment}>
                        <input value={content} onChange={(e) => setContent(e.target.value)} type='text' placeholder='post a comment...'></input>
                        <button type='submit'>post</button>
                    </form>

                </div>
            </div>
        </>
    )
}


export default MainFeedPost;
