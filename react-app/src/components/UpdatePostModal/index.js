import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { updateOnePost } from '../../store/post';
import { useHistory } from 'react-router';
import "./UpdatePostModal.css"


function UpdatePostModal ({post}) {

    let history = useHistory()

    const [showModal, setShowModal] = useState(false);
    const [body, setBody] = useState(post?.body)
    const dispatch = useDispatch();

    const submitUpdatePost = (e) => {
        e.preventDefault()
        const payload = {
            body
        }
        setShowModal(false)
        dispatch(updateOnePost(payload, post?.id))
        history.push(`/${post?.id}`)

    }

    // const handleClose = () => {
    //     setShowModal(false)
    //     setContent('')
    // }

    return (
        <>
            <div>
                <div onClick={() => setShowModal(true)}>update post</div>
            </div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <div>
                    <img className="update-post-image" alt="" src={post?.imageUrl}></img>
                    <form onSubmit={submitUpdatePost}>
                        <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        >
                        </textarea>
                        <button type="submit">update post</button>
                    </form>
                </div>
            </Modal>
          )}
        </>
    )
}

export default UpdatePostModal;
