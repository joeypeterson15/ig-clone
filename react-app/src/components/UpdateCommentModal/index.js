import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { updateOneComment } from '../../store/comment';



function UpdateCommentModal ({comment , setCommentMenu}) {
    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState(comment?.content)
    const dispatch = useDispatch();

    const submitUpdateComment = () => (e) => {
        e.preventDefault()
        const payload = {
            content
        }
        setShowModal(false)
        dispatch(updateOneComment(payload, comment?.id))
        setCommentMenu(false)

    }

    const handleClose = () => {
        setShowModal(false)
        setContent('')
    }

    return (
        <>

            <div className="edit-comment-buttons" onClick={() => setShowModal(true)}>edit</div>

            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <div>
                    <form onSubmit={submitUpdateComment()}>
                        <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        >
                        </textarea>
                        <button type="submit">update comment</button>
                    </form>
                </div>
            </Modal>
          )}
        </>
    )
}

export default UpdateCommentModal;
