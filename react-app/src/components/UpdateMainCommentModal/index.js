import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { updateOneMainComment } from '../../store/mainComments';
import './UpdateMainCommentModal.css'


function UpdateMainCommentModal ({setCommentMenu, comment}) {
    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState(comment?.content)
    const dispatch = useDispatch();

    const submitUpdateComment = () => (e) => {
        e.preventDefault()
        const payload = {
            content
        }
        setShowModal(false)
        dispatch(updateOneMainComment(payload, comment?.id))
        setCommentMenu(false)

    }

    const closeModal = (e) => {
        // e.preventDefault()
        setCommentMenu(false)
        setShowModal(false)
    }

    const openUpdate = () => {
        setCommentMenu(false)
        setShowModal(true)
    }

    return (
        <>
            <div>
                <div className="edit-comment-buttons" onClick={() => setShowModal(true)}>edit</div>
            </div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <div className="edit-main-comment-container">
                    <form className="update-comment-modal-form" onSubmit={submitUpdateComment()}>
                        <textarea className="update-main-modal-textarea"
                        col={30}
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        >
                        </textarea>
                        <button className="submit-modal-button" type="submit">Update</button>
                        <button onClick={closeModal} className="cancel-button-modal">Cancel</button>
                    </form>
                </div>
            </Modal>
          )}
        </>
    )
}

export default UpdateMainCommentModal;
