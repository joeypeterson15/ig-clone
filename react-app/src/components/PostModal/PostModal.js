import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import "./PostModal.css"


function PostModal ({ post, user }) {
    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu, showModal]);

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };

    return (
        <>

            <div key={post.id} onClick={() => setShowModal(true)}>
                <img className="post-image" src={post.imageUrl}></img>
                <div>{post.body}</div>
            </div>

            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div className="post-modal-container">
                    <div className="left-image">
                        <img className="image-modal" src={post.imageUrl}></img>
                    </div>
                    <div className="post-modal-right">
                        <div className="upper-right-modal">
                            <div>{user?.username}</div>
                            <div>
                            <button onClick={openMenu}>edit</button>
                                {showMenu && (
                                    <ul className="profile-dropdown">
                                    <li>{user.username}</li>
                                    <li>{user.email}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="middle-right-modal">
                            <div>
                                {user?.username}
                            </div>
                            <div>
                                {post.body}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
          )}
        </>
    )
}

export default PostModal;
