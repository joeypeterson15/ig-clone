import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { createOnePost } from '../../store/post';
import { useDispatch } from 'react-redux';
import { useSelector} from 'react-redux';

function AddPostModal () {
    const [showModal, setShowModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('')
    const [body, setBody] = useState('')

    const user = useSelector((state) => state.session?.user)

    const dispatch = useDispatch()
    const createPost = (e) => {
        e.preventDefault()

        const payload = {
            userId : user?.id,
            body,
            imageUrl,
            avatar: user?.avatar,
            username: user?.username
        }
        setShowModal(false)
        dispatch(createOnePost(payload))
        setBody('')
        setImageUrl('')
    }

    return (
        <>
        <div onClick={() => setShowModal(true)}>
          <div>
            <i className="fas fa-plus">Create Post</i>
          </div>
        </div>
        {showModal && (
        <Modal  onClose={() => setShowModal(false)}>
            <form onSubmit={createPost}>
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} type="text" placeholder="imageUrl"></input>
                <input value={body} onChange={(e) => setBody(e.target.value)}type="text" placeholder="content"></input>
                <button type="submit">Create Post</button>
            </form>
        </Modal>
      )}
    </>
    )
}

export default AddPostModal;
