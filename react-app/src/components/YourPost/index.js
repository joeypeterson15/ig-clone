import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router'
import { useState, useEffect} from 'react';

import { getComments, createOneComment } from '../../store/comment';
import { getLikes } from '../../store/like';
import { createOneLike } from '../../store/like';
import { deleteMyLike } from '../../store/like';

import DeleteCommentModal from '../DeleteCommentModal';
import UpdateCommentModal from '../UpdateCommentModal';

import { getUser } from '../../store/user';

import { Link } from 'react-router-dom';
import "../Post/Post.css"

function YourPost () {

    let history = useHistory()
    // const [showMenu, setShowMenu] = useState(false);
    const [content, setContent] = useState('')
    const [hashtags, setHashtags] = useState([])
    const [body, setBody] = useState([])
    // const [isLiked, setIsLiked] = useState(false)

    const params = useParams()
    const {postId} = params

    const sessionUser = useSelector((state) => state.session?.user)
    const user = useSelector((state) => Object.values(state.user)[0])
    const comments = useSelector((state) => Object.values(state.comments))
    const post1 = useSelector((state) => state.allPosts[postId])
    const post = useSelector((state) => Object.values(state.allPosts).find(post => post?.id == postId))

    const likes = useSelector((state) => Object.values(state.likes))


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser(post?.userId))
        dispatch(getComments(postId))
        dispatch(getLikes(postId))

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




    const createComment = (e) => {
        e.preventDefault()
        const payload = {
            content,
            postId,
            userId: user?.id
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
            userId : sessionUser?.id,
            postId,
            username : sessionUser?.username
        }
        dispatch(createOneLike(payload))
    }

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

    const deleteLike = () => {
        dispatch(deleteMyLike(sessionUser?.id, post?.id))
    }

    return (
        <div className="post-outer-container">
            <div onClick={() => history.push('/explore')}>exit</div>
            <div className="post-modal-container">
                        <div className="left-image">
                            <img className="image-modal" src={post?.imageUrl}></img>
                        </div>
                        <div className="post-modal-right">
                            <div className="upper-right-modal">
                                <Link to={`/p/${post?.userId}`}>{user?.username}</Link>

                            </div>
                            <div className="middle-right-modal">
                                <div>
                                    {user?.username}
                                </div>
                                <div>
                                    {body.join(' ')}
                                </div>
                                <div>
                                    {hashtags ? hashtags.map((hashtag) => (
                                        <Link to={`/hashtags/${hashtag.substring(1)}`}>{hashtag}</Link>
                                    ))

                                : ""}
                                </div>
                            </div>
                            <div className="bottom-right-comments">
                                {comments ?
                                comments.map((comment) => (
                                    <div className='comment-edit-div'>
                                        <div>{comment.content}</div>
                                        {comment.userId === user?.id ?
                                        <div>
                                        <UpdateCommentModal comment={comment}/>
                                        <DeleteCommentModal comment={comment}/>
                                    </div>
                                     : ''}
                                    </div>


                                )) :
                                <div>There are currently no comments for this post</div>}
                            </div>

                            <div className="likes-right-div">
                                <div>
                                    {!isLiked()
                                    ?
                                    <div>

                                        <i onClick={createLike} className="far fa-heart"></i>

                                    </div>
                                    :
                                    <div>
                                        {/* <button onClick={deleteLike}>unlike</button> */}
                                        <i onClick={deleteLike} className="fas fa-heart"></i>
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
                    </div>




        </div>
    )
}

export default YourPost
