import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteMainFeedComment } from '../../store/mainComments';

function DeleteMainCommentModal ({comment}) {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()

    const deleteComment = (e) => {
        e.preventDefault()
        setShowModal(false)
        dispatch(deleteMainFeedComment(comment?.id))
    }

    return (
        <>
        <div onClick={() => setShowModal(true)}>
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

export default DeleteMainCommentModal;
