import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteOneComment } from '../../store/comment';
import '../DeleteMainCommentModal/DeleteMainCommentModal.css'

function DeleteCommentModal ({comment, setCommentMenu }) {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()

    const deleteComment = (e) => {
        e.preventDefault()
        setShowModal(false)
        dispatch(deleteOneComment(comment?.id))
        setCommentMenu(false)

    }

    const closeModal = (e) => {
        // e.preventDefault()
        setCommentMenu(false)
        setShowModal(false)
    }

    return (
        <>
        <div className="edit-comment-buttons" onClick={() => setShowModal(true)}>
          delete
        </div>
        {showModal && (
        <Modal  onClose={() => setShowModal(false)}>
            <form className="delete-comment-modal-form" onSubmit={deleteComment}>
                <button className="submit-modal-button" type="submit">Delete</button>
                <button onClick={closeModal} className="cancel-button-modal">Cancel</button>
            </form>
        </Modal>
      )}
    </>
    )
}

export default DeleteCommentModal;
