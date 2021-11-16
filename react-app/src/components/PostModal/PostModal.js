import React, { useState } from 'react';
import { Modal } from '../../context/Modal';


function PostModal ({ post }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>

            <div key={post.id} onClick={() => setShowModal(true)}>
                <img className="post-image" src={post.imageUrl}></img>
                <div>{post.body}</div>
            </div>

            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <img src={post.imageUrl}></img>
                <div>{post.body}</div>
            </Modal>
          )}
        </>
    )
}

export default PostModal;
