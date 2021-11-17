import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router'
import { useState, useEffect} from 'react';
import { getMyPosts } from '../../store/post';
import { Modal } from '../../context/Modal';
import { deleteOnePost } from '../../store/post';
import "./Post.css"

function Post () {

    const params = useParams()
    const {postId} = params
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false)
    const user = useSelector((state) => state.session?.user)
    let history = useHistory()


    const post = useSelector((state) => state.myPosts[postId])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyPosts(user?.id))
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

    const deletePost = () => {
        dispatch(deleteOnePost(postId))
        history.push('/profile')
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

                            </div>
                            <div className="middle-right-modal">
                                <div>
                                    {user?.username}
                                </div>
                                <div>
                                    {post?.body}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* {isDeleted ? <Redirect to="/profile"/> : ''} */}


        </div>
    )
}

export default Post
