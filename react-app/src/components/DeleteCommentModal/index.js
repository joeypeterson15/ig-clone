import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteOneComment } from '../../store/comment';

function DeleteCommentModal ({comment, setCommentMenu }) {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()

    const deleteComment = (e) => {
        e.preventDefault()
        setShowModal(false)
        dispatch(deleteOneComment(comment?.id))
        setCommentMenu(false)

    }

    return (
        <>
        <div className="edit-comment-buttons" onClick={() => setShowModal(true)}>
          delete
        </div>
        {showModal && (
        <Modal  onClose={() => setShowModal(false)}>
            <form onSubmit={deleteComment}>
                <button type="submit">Delete</button>
                <div>Cancel</div>
            </form>
        </Modal>
      )}
    </>
    )
}

export default DeleteCommentModal;
