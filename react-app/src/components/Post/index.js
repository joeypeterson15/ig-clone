import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router'
import { useState, useEffect} from 'react';
import { deleteOnePost } from '../../store/post';
import { getComments, createOneComment } from '../../store/comment';
import { getLikes } from '../../store/like';
import { createOneLike } from '../../store/like';
import DeleteCommentModal from '../DeleteCommentModal';
import { deleteMyLike } from '../../store/like';
import { Link } from 'react-router-dom';
import UpdateCommentModal from '../UpdateCommentModal';
import UpdatePostModal from '../UpdatePostModal';
import "./Post.css"

function Post () {

    let history = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const [content, setContent] = useState('')
    const [hashtags, setHashtags] = useState([])
    const [body, setBody] = useState([])

    const params = useParams()
    const {postId} = params

    const user = useSelector((state) => state.session?.user)
    const comments = useSelector((state) => Object.values(state.comments))
    const post1 = useSelector((state) => state?.myPosts[postId])
    const post = useSelector((state) => Object.values(state.myPosts).find(post => post.id == postId))
    const likes = useSelector((state) => Object.values(state.likes))

    console.log(post1)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getComments(postId))
        dispatch(getLikes(postId))

    }, [dispatch])


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };


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

    // const hashTagBody = () => {
    //     let split = post?.body.split(" ")
    //     for (let i = 0; i < split.length; i++) {
    //         let e = split[i];
    //         if (e.includes("#")) {
    //             setHashtags(old => [...old, e])
    //             split.splice(i,1)
    //         }
    //     }
    //      setBody(split.join(' '))
    //      console.log(body)
    // }



    const deletePost = () => {
        dispatch(deleteOnePost(postId))
        history.push('/profile')
    }

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




    return (
        <div className="post-outer-container">
            <div onClick={() => history.push('/profile')}>exit</div>
            <div className="post-modal-container">
                        <div className="left-image">
                            <img className="image-modal" src={post?.imageUrl}></img>
                        </div>
                        <div className="post-modal-right">
                            <div className="upper-right-modal">
                                <div>{user?.username}</div>

                                <div onClick={openMenu} >edit</div>
                                    {showMenu && (
                                        <ul className="edit-post-dropdown">
                                        <li></li>
                                        <button onClick={deletePost}>delete post</button>
                                        </ul>
                                    )}
                                <UpdatePostModal post={post}/>

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
                    </div>




        </div>
    )
}

export default Post
